package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.QualityInspection;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QualityInspectionRepository extends JpaRepository<QualityInspection, Long> {
}