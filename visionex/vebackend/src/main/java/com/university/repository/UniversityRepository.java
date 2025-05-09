// src/main/java/com/university/repository/UniversityRepository.java
package com.university.repository;

import com.university.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
}