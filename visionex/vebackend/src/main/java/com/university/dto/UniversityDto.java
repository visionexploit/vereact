// src/main/java/com/university/dto/UniversityDto.java
package com.university.dto;

import lombok.Data;

@Data
public class UniversityDto {
    private Long id;
    private String name;
    private String country;
    private String city;
    private String address;
    private String website;
    private String description;
    private String logoUrl;
    private String contactEmail;
    private String contactPhone;
}