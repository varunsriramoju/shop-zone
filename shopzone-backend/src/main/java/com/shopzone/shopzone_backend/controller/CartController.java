package com.shopzone.shopzone_backend.controller;

import com.shopzone.shopzone_backend.model.Cart;
import com.shopzone.shopzone_backend.repository.UserRepository;
import com.shopzone.shopzone_backend.security.JwtTokenProvider;
import com.shopzone.shopzone_backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private Long getUserId(String authHeader) {
        String email = jwtTokenProvider.getEmailFromToken(authHeader.substring(7));
        return userRepository.findByEmail(email).orElseThrow().getId();
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(@RequestHeader("Authorization") String auth) {
        return ResponseEntity.ok(cartService.getCart(getUserId(auth)));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItem(@RequestHeader("Authorization") String auth,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(cartService.addItem(getUserId(auth), productId, quantity));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<Cart> updateItem(@RequestHeader("Authorization") String auth,
            @PathVariable Long itemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItem(getUserId(auth), itemId, quantity));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearCart(
            @RequestHeader("Authorization") String auth) {
        cartService.clearCart(getUserId(auth));
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }
}
