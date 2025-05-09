// src/main/java/com/university/controller/AdminController.java
package com.university.controller;

import com.university.dto.ApplicationDto;
import com.university.dto.StatsDto;
import com.university.dto.UserDto;
import com.university.service.ApplicationService;
import com.university.service.StatsService;
import com.university.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private StatsService statsService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getAdminProfile() {
        // Similar to StudentController's getStudentProfile
        return userService.getCurrentUserProfile();
    }

    @GetMapping("/students")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDto>> getAllStudents() {
        List<UserDto> students = userService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ApplicationDto>> getAllApplications() {
        List<ApplicationDto> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    @PutMapping("/applications/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        
        String newStatus = statusUpdate.get("status");
        if (newStatus == null || !List.of("PENDING", "APPROVED", "REJECTED").contains(newStatus)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid status"));
        }
        
        ApplicationDto updatedApplication = applicationService.updateApplicationStatus(id, newStatus);
        return ResponseEntity.ok(updatedApplication);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StatsDto> getStatistics() {
        StatsDto stats = statsService.getStatistics();
        return ResponseEntity.ok(stats);
    }
}