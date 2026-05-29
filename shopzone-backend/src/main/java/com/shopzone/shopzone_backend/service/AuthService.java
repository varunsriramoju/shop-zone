package com.shopzone.shopzone_backend.service;

import com.shopzone.shopzone_backend.dto.request.*;
import com.shopzone.shopzone_backend.dto.response.AuthResponse;
import com.shopzone.shopzone_backend.exception.BadRequestException;
import com.shopzone.shopzone_backend.model.User;
import com.shopzone.shopzone_backend.repository.UserRepository;
import com.shopzone.shopzone_backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("This email is already registered.");
        }

        User user = User.builder()
            .name(request.getName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(User.Role.USER)
            .build();

        userRepository.save(user);
        String token = jwtTokenProvider.generateToken(user);

        return AuthResponse.builder()
            .token(token).name(user.getName())
            .email(user.getEmail()).role(user.getRole().name())
            .build();
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadRequestException("Invalid email or password.");
        }

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtTokenProvider.generateToken(user);

        return AuthResponse.builder()
            .token(token).name(user.getName())
            .email(user.getEmail()).role(user.getRole().name())
            .build();
    }
}
