package com.university.service;

import com.university.dto.ProgramDto;
import java.util.List;
import java.util.Optional;

public interface ProgramService {
    List<ProgramDto> getAllPrograms();
    ProgramDto getProgramById(Long id);
    ProgramDto createProgram(ProgramDto program);
    ProgramDto updateProgram(ProgramDto program);
    void deleteProgram(Long id);
    List<ProgramDto> getProgramsByUniversity(Long universityId);
    List<ProgramDto> searchPrograms(String query);
    List<ProgramDto> getProgramsByLevel(String level);
    List<ProgramDto> getProgramsByLanguage(String language);
    List<ProgramDto> getProgramsByPriceRange(double minPrice, double maxPrice);
}
