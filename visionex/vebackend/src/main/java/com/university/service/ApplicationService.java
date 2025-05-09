package com.university.service;

import com.university.dto.ApplicationDto;
import java.util.List;

public interface ApplicationService {
    List<ApplicationDto> getAllApplications();
    ApplicationDto getApplicationById(Long id);
    ApplicationDto createApplication(ApplicationDto application);
    ApplicationDto updateApplication(ApplicationDto application);
    void deleteApplication(Long id);
    List<ApplicationDto> getApplicationsByUserId(Long userId);
    List<ApplicationDto> getApplicationsByProgram(Long programId);
    List<ApplicationDto> getApplicationsByStatus(String status);
    ApplicationDto updateApplicationStatus(Long id, String status);
    void submitApplication(Long id);
    void withdrawApplication(Long id);
}
