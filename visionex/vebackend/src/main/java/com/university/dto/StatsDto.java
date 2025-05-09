// src/main/java/com/university/dto/StatsDto.java
package com.university.dto;

public class StatsDto {
    private Long totalStudents;
    private Long totalApplications;
    private Long pendingApplications;
    private Long approvedApplications;
    private Long rejectedApplications;
    private Long totalUniversities;
    private Long totalPrograms;

    // Getters and Setters
    public Long getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public Long getTotalApplications() {
        return totalApplications;
    }

    public void setTotalApplications(Long totalApplications) {
        this.totalApplications = totalApplications;
    }

    public Long getPendingApplications() {
        return pendingApplications;
    }

    public void setPendingApplications(Long pendingApplications) {
        this.pendingApplications = pendingApplications;
    }

    public Long getApprovedApplications() {
        return approvedApplications;
    }

    public void setApprovedApplications(Long approvedApplications) {
        this.approvedApplications = approvedApplications;
    }

    public Long getRejectedApplications() {
        return rejectedApplications;
    }

    public void setRejectedApplications(Long rejectedApplications) {
        this.rejectedApplications = rejectedApplications;
    }

    public Long getTotalUniversities() {
        return totalUniversities;
    }

    public void setTotalUniversities(Long totalUniversities) {
        this.totalUniversities = totalUniversities;
    }

    public Long getTotalPrograms() {
        return totalPrograms;
    }

    public void setTotalPrograms(Long totalPrograms) {
        this.totalPrograms = totalPrograms;
    }
}