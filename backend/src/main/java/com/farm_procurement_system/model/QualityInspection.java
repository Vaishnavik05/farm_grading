package com.farm_procurement_system.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "quality_inspections")
@Data
public class QualityInspection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produce_id")
    private FarmProduce farmProduce;

    @ManyToOne
    @JoinColumn(name = "inspector_id")
    private User inspector;

    private Integer qualityScore;

    @ManyToOne
    @JoinColumn(name = "grade_id")
    private QualityGrade assignedGrade;

    private String inspectionDate;

    @Enumerated(EnumType.STRING)
    private InspectionStatus inspectionStatus;
}