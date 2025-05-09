// src/main/java/com/university/model/Application.java
package com.university.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "program_id")
    private Program program;

    private LocalDateTime applicationDate;
    private String status; // "PENDING", "APPROVED", "REJECTED"
    private String personalStatement;
    private String educationBackground;
    private String additionalDocuments;

    public Application() {
    }

    public Application(User user, Program program, String personalStatement, String educationBackground) {
        this.user = user;
        this.program = program;
        this.applicationDate = LocalDateTime.now();
        this.status = "PENDING";
        this.personalStatement = personalStatement;
        this.educationBackground = educationBackground;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }

    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPersonalStatement() {
        return personalStatement;
    }

    public void setPersonalStatement(String personalStatement) {
        this.personalStatement = personalStatement;
    }

    public String getEducationBackground() {
        return educationBackground;
    }

    public void setEducationBackground(String educationBackground) {
        this.educationBackground = educationBackground;
    }

    public String getAdditionalDocuments() {
        return additionalDocuments;
    }

    public void setAdditionalDocuments(String additionalDocuments) {
        this.additionalDocuments = additionalDocuments;
    }
}