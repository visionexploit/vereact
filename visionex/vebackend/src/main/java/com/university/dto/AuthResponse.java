package com.university.dto;

import lombok.Data;
import java.util.Set;

@Data
public class AuthResponse {
    private String token;
    private UserDto user;
    private String userType;
    private Set<String> roles;
} 