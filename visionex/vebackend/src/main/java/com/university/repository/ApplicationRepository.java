// src/main/java/com/university/repository/ApplicationRepository.java
package com.university.repository;

import com.university.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);
    List<Application> findByProgramId(Long programId);
    List<Application> findByStatus(String status);
}