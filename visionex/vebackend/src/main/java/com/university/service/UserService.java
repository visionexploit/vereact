package com.university.service;

import com.university.model.User;
import com.university.dto.UserDto;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    User findByEmail(String email);
    User findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    void changePassword(Long userId, String oldPassword, String newPassword);
    void resetPassword(String email);
    ResponseEntity<UserDto> getCurrentUserProfile();
    List<UserDto> getAllStudents();
    UserDto getUserByUsername(String username);
    UserDto updateUser(UserDto userDto);
}
