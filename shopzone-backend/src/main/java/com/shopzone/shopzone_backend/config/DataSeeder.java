package com.shopzone.shopzone_backend.config;

import com.shopzone.shopzone_backend.model.User;
import com.shopzone.shopzone_backend.repository.UserRepository;
import com.shopzone.shopzone_backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedDatabase() {
        return args -> {
            if (!userRepository.existsByEmail("admin@shopzone.com")) {
                User admin = User.builder()
                        .name("Admin User")
                        .email("admin@shopzone.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(User.Role.ADMIN)
                        .build();
                userRepository.save(admin);
                System.out.println("Admin user created: admin@shopzone.com / admin123");
            }
            
            // Need a category to create products
            if (categoryRepository.count() == 0) {
                com.shopzone.shopzone_backend.model.Category defaultCategory = com.shopzone.shopzone_backend.model.Category.builder()
                        .name("General")
                        .description("Default category")
                        .build();
                categoryRepository.save(defaultCategory);
                System.out.println("Default category created.");
            }
        };
    }
}
