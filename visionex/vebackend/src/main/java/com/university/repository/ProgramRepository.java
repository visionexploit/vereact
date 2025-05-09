// src/main/java/com/university/repository/ProgramRepository.java
package com.university.repository;

import com.university.model.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    List<Program> findByUniversityId(Long universityId);
}