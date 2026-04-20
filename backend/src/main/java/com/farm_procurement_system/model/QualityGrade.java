package com.farm_procurement_system.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "quality_grades")
@Data
public class QualityGrade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String gradeName;
    private String description;

    private Integer minScore;
    private Integer maxScore;
    private LocalDateTime createdAt = LocalDateTime.now();
    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}