package com.shopzone.shopzone_backend.service;

import com.shopzone.shopzone_backend.dto.request.ProductRequest;
import com.shopzone.shopzone_backend.dto.response.ProductResponse;
import com.shopzone.shopzone_backend.exception.ResourceNotFoundException;
import com.shopzone.shopzone_backend.model.*;
import com.shopzone.shopzone_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public Page<ProductResponse> searchProducts(String name, Long categoryId,
            BigDecimal minPrice, BigDecimal maxPrice,
            int page, int size, String sortBy, String sortDir) {

        // Native SQL uses DB column names (snake_case), not JPA field names
        String sortColumn = "createdAt".equals(sortBy) ? "created_at" : sortBy;

        Sort sort = sortDir.equalsIgnoreCase("asc")
            ? Sort.by(sortColumn).ascending()
            : Sort.by(sortColumn).descending();

        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.searchProducts(name, categoryId, minPrice, maxPrice, pageable)
            .map(this::toResponse);
    }

    public ProductResponse getById(Long id) {
        return toResponse(productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id)));
    }

    public ProductResponse create(ProductRequest req) {
        Category cat = categoryRepository.findById(req.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + req.getCategoryId()));
        Product product = Product.builder()
            .name(req.getName()).description(req.getDescription())
            .price(req.getPrice()).stock(req.getStock())
            .imageUrl(req.getImageUrl()).category(cat).build();
        return toResponse(productRepository.save(product));
    }

    public ProductResponse update(Long id, ProductRequest req) {
        Product existing = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
        existing.setName(req.getName());
        existing.setDescription(req.getDescription());
        existing.setPrice(req.getPrice());
        existing.setStock(req.getStock());
        existing.setImageUrl(req.getImageUrl());
        if (req.getCategoryId() != null) {
            existing.setCategory(categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found")));
        }
        return toResponse(productRepository.save(existing));
    }

    public void delete(Long id) {
        productRepository.delete(productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id)));
    }

    // NEW: Return all products as a simple list for public shop page
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
            .id(p.getId()).name(p.getName()).description(p.getDescription())
            .price(p.getPrice()).stock(p.getStock()).imageUrl(p.getImageUrl())
            .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
            .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
            .createdAt(p.getCreatedAt()).build();
    }
}
