package com.shopzone.shopzone_backend.dto.response;

import lombok.*;


@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String role;
}
