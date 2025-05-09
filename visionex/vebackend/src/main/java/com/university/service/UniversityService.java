package com.university.service;

import com.university.dto.UniversityDto;
import java.util.List;

public interface UniversityService {
    List<UniversityDto> getAllUniversities();
    UniversityDto getUniversityById(Long id);
    UniversityDto createUniversity(UniversityDto university);
    UniversityDto updateUniversity(UniversityDto university);
    void deleteUniversity(Long id);
}
