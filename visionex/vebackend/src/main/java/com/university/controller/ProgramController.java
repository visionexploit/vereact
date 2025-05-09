// src/main/java/com/university/controller/ProgramController.java
package com.university.controller;

import com.university.dto.ProgramDto;
import com.university.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @GetMapping
    public ResponseEntity<List<ProgramDto>> getAllPrograms() {
        List<ProgramDto> programs = programService.getAllPrograms();
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramDto> getProgramById(@PathVariable Long id) {
        ProgramDto program = programService.getProgramById(id);
        return ResponseEntity.ok(program);
    }

    @GetMapping("/university/{universityId}")
    public ResponseEntity<List<ProgramDto>> getProgramsByUniversity(@PathVariable Long universityId) {
        List<ProgramDto> programs = programService.getProgramsByUniversity(universityId);
        return ResponseEntity.ok(programs);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProgramDto> createProgram(@RequestBody ProgramDto programDto) {
        ProgramDto createdProgram = programService.createProgram(programDto);
        return ResponseEntity.ok(createdProgram);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProgramDto> updateProgram(@PathVariable Long id, @RequestBody ProgramDto programDto) {
        programDto.setId(id);
        ProgramDto updatedProgram = programService.updateProgram(programDto);
        return ResponseEntity.ok(updatedProgram);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.ok().build();
    }
}