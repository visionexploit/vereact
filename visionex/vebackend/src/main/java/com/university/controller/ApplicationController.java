// src/main/java/com/university/controller/ApplicationController.java
package com.university.controller;

import com.university.dto.ApplicationDto;
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
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;
    
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userService.findByUsername(username);
        
        ApplicationDto application = applicationService.getApplicationById(id);
        
        // If student is accessing, ensure they only see their own applications
        if (user.getRoles().stream().anyMatch(r -> r.getName().name().equals("ROLE_STUDENT")) 
                && !application.getUserId().equals(user.getId())) {
            return ResponseEntity.status(403).build();
        }
        
        return ResponseEntity.ok(application);
    }
}