package com.university.dto;

import lombok.Data;
import java.util.Set;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private Set<String> roles;
} 