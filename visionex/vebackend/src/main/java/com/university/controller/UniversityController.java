// src/main/java/com/university/controller/UniversityController.java
package com.university.controller;

import com.university.dto.UniversityDto;
import com.university.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/universities")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @GetMapping
    public ResponseEntity<List<UniversityDto>> getAllUniversities() {
        List<UniversityDto> universities = universityService.getAllUniversities();
        return ResponseEntity.ok(universities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UniversityDto> getUniversityById(@PathVariable Long id) {
        UniversityDto university = universityService.getUniversityById(id);
        return ResponseEntity.ok(university);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UniversityDto> createUniversity(@RequestBody UniversityDto universityDto) {
        UniversityDto createdUniversity = universityService.createUniversity(universityDto);
        return ResponseEntity.ok(createdUniversity);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UniversityDto> updateUniversity(@PathVariable Long id, @RequestBody UniversityDto universityDto) {
        universityDto.setId(id);
        UniversityDto updatedUniversity = universityService.updateUniversity(universityDto);
        return ResponseEntity.ok(updatedUniversity);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUniversity(@PathVariable Long id) {
        universityService.deleteUniversity(id);
        return ResponseEntity.ok().build();
    }
}