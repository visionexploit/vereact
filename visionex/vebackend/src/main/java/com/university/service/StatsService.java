package com.university.service;

import com.university.dto.StatsDto;
import java.util.Map;
import java.util.List;

public interface StatsService {
    Map<String, Long> getApplicationStats();
    Map<String, Long> getProgramStats();
    Map<String, Long> getUniversityStats();
    Map<String, Long> getCountryStats();
    Map<String, Long> getLanguageStats();
    Map<String, Long> getLevelStats();
    List<Map<String, Object>> getTopUniversities(int limit);
    List<Map<String, Object>> getTopPrograms(int limit);
    Map<String, Object> getApplicationTrends(String period);
    Map<String, Object> getRevenueStats(String period);
    StatsDto getStatistics();
}
