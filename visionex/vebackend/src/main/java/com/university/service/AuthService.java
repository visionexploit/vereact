package com.university.service;

import com.university.dto.LoginRequest;
import com.university.dto.RegisterRequest;
import com.university.dto.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
    AuthResponse register(RegisterRequest registerRequest);
    void logout(String token);
    AuthResponse refreshToken(String refreshToken);
    void verifyEmail(String token);
    void resendVerificationEmail(String email);
    void forgotPassword(String email);
    void resetPassword(String token, String newPassword);
}
