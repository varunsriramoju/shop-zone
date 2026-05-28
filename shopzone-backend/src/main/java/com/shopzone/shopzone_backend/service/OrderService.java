package com.shopzone.shopzone_backend.service;

import com.shopzone.shopzone_backend.exception.*;
import com.shopzone.shopzone_backend.model.*;
import com.shopzone.shopzone_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @Transactional
    public Order placeOrder(Long userId, String address) {
        Cart cart = cartRepository.findByUserId(userId)
            .orElseThrow(() -> new BadRequestException("Cart is empty."));

        if (cart.getItems().isEmpty())
            throw new BadRequestException("Cannot place order with empty cart.");

        User user = userRepository.findById(userId).orElseThrow();

        Order order = orderRepository.save(
            Order.builder().user(user).address(address).totalAmount(BigDecimal.ZERO).build());

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            if (product.getStock() < cartItem.getQuantity())
                throw new BadRequestException("Not enough stock for: " + product.getName());

            product.setStock(product.getStock() - cartItem.getQuantity());
            productRepository.save(product);

            total = total.add(product.getPrice().multiply(
                BigDecimal.valueOf(cartItem.getQuantity())));

            order.getItems().add(OrderItem.builder()
                .order(order).product(product)
                .quantity(cartItem.getQuantity()).price(product.getPrice())
                .build());
        }

        order.setTotalAmount(total);
        orderRepository.save(order);
        cartService.clearCart(userId);
        return order;
    }

    public List<Order> getMyOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
        if (!order.getUser().getId().equals(userId))
            throw new BadRequestException("Access denied: not your order.");
        return order;
    }

    public Order updateStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found: " + orderId));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll(Sort.by("createdAt").descending());
    }
}
