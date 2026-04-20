package com.farm_procurement_system.model;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "procurement_orders")
@Data
public class ProcurementOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produce_id")
    private FarmProduce farmProduce;

    @ManyToOne
    @JoinColumn(name = "officer_id")
    private User procurementOfficer;

    private Double procurementQuantity;
    private Double unitPrice;
    private Double totalAmount;

    private String orderDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private LocalDateTime createdAt = LocalDateTime.now();
    @PrePersist
    public void setCreatedAt() {
        this.createdAt = LocalDateTime.now();
    }
}