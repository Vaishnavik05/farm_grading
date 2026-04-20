package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.ProcurementOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcurementOrderRepository extends JpaRepository<ProcurementOrder, Long> {
}