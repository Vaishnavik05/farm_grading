package com.farm_procurement_system.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "produce_inventory")
@Data
public class ProduceInventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProduceCategory produceCategory;

    private Double availableQuantity;

    private LocalDateTime lastUpdated;

    @PrePersist
    @PreUpdate
    public void updateTimestamp() {
        this.lastUpdated = LocalDateTime.now();
    }

     @Enumerated(EnumType.STRING)
    private InventoryStatus inventoryStatus;
}