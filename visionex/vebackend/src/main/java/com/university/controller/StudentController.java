// src/main/java/com/university/controller/StudentController.java
package com.university.controller;

import com.university.dto.ApplicationDto;
import com.university.dto.UserDto;
import com.university.model.User;
import com.university.service.ApplicationService;
import com.university.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<UserDto> getStudentProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        UserDto userDto = userService.getUserByUsername(username);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<UserDto> updateStudentProfile(@RequestBody UserDto userDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        // Ensure we're updating the authenticated user
        User currentUser = userService.findByUsername(username);
        userDto.setId(currentUser.getId());
        
        UserDto updatedUser = userService.updateUser(userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<ApplicationDto>> getStudentApplications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        
        List<ApplicationDto> applications = applicationService.getApplicationsByUserId(user.getId());
        return ResponseEntity.ok(applications);
    }

    @PostMapping("/applications")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApplicationDto> submitApplication(@RequestBody ApplicationDto applicationDto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        
        applicationDto.setUserId(user.getId());
        ApplicationDto createdApplication = applicationService.createApplication(applicationDto);
        return ResponseEntity.ok(createdApplication);
    }
}