package com.farm_procurement_system.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "farm_produce")
@Data
public class FarmProduce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private User farmer;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProduceCategory produceCategory;

    private Double quantity;

    @Enumerated(EnumType.STRING)
    private UnitType unitType;

    private String harvestDate;

    @Enumerated(EnumType.STRING)
    private ProduceStatus produceStatus;
    private LocalDateTime createdAt = LocalDateTime.now();
    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}