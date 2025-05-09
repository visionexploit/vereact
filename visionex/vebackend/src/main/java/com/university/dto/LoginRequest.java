package com.university.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
    private String userType; // "admin" or "student"
} 