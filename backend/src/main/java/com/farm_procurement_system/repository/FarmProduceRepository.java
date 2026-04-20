package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.FarmProduce;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmProduceRepository extends JpaRepository<FarmProduce, Long> {
}