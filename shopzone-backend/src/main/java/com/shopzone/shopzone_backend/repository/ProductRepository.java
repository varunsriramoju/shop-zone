package com.shopzone.shopzone_backend.repository;

import com.shopzone.shopzone_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "SELECT * FROM products p WHERE (:name IS NULL OR LOWER(p.name) LIKE CONCAT('%', LOWER(:name), '%')) AND (:categoryId IS NULL OR p.category_id = :categoryId) AND (:minPrice IS NULL OR p.price >= :minPrice) AND (:maxPrice IS NULL OR p.price <= :maxPrice)", nativeQuery = true)
    Page<Product> searchProducts(@Param("name") String name,
                                 @Param("categoryId") Long categoryId,
                                 @Param("minPrice") BigDecimal minPrice,
                                 @Param("maxPrice") BigDecimal maxPrice,
                                 Pageable pageable);
}
