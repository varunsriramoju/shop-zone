package com.shopzone.shopzone_backend.service;

import com.shopzone.shopzone_backend.exception.*;
import com.shopzone.shopzone_backend.model.*;
import com.shopzone.shopzone_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
            return cartRepository.save(Cart.builder().user(user).build());
        });
    }

    public Cart getCart(Long userId) {
        return getOrCreateCart(userId);
    }

    public Cart addItem(Long userId, Long productId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));

        if (product.getStock() < quantity) {
            throw new BadRequestException(
"Only " + product.getStock() + " units available for: " + product.getName());
        }

        cartItemRepository.findByCartIdAndProductId(cart.getId(), productId)
            .ifPresentOrElse(
                item -> { item.setQuantity(item.getQuantity() + quantity);
                          cartItemRepository.save(item); },
                () -> cartItemRepository.save(
                    CartItem.builder().cart(cart).product(product).quantity(quantity).build())
            );

        return cartRepository.findById(cart.getId()).orElseThrow();
    }

    public Cart updateItem(Long userId, Long itemId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        CartItem item = cartItemRepository.findById(itemId)
            .orElseThrow(() -> new ResourceNotFoundException("Cart item not found: " + itemId));
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        return cartRepository.findById(cart.getId()).orElseThrow();
    }

    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
