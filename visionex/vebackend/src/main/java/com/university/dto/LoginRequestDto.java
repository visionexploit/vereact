// src/main/java/com/university/dto/LoginRequestDto.java
package com.university.dto;

public class LoginRequestDto {
    private String username;
    private String password;
    private String userType; // "student" or "admin"

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}