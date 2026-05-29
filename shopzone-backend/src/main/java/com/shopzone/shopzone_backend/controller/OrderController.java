package com.shopzone.shopzone_backend.controller;

import com.shopzone.shopzone_backend.model.Order;
import com.shopzone.shopzone_backend.repository.UserRepository;
import com.shopzone.shopzone_backend.security.JwtTokenProvider;
import com.shopzone.shopzone_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    private Long getUserId(String auth) {
        return userRepository.findByEmail(
            jwtTokenProvider.getEmailFromToken(auth.substring(7))).orElseThrow().getId();
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestHeader("Authorization") String auth,
            @RequestParam String address) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(orderService.placeOrder(getUserId(auth), address));
    }

    @GetMapping
    public ResponseEntity<List<Order>> myOrders(@RequestHeader("Authorization") String auth) {
        return ResponseEntity.ok(orderService.getMyOrders(getUserId(auth)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrder(@RequestHeader("Authorization") String auth,
            @PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id, getUserId(auth)));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id,
            @RequestParam Order.OrderStatus status) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@RequestHeader("Authorization") String auth,
            @PathVariable Long id) {
        return ResponseEntity.ok(orderService.cancelOrder(getUserId(auth), id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
