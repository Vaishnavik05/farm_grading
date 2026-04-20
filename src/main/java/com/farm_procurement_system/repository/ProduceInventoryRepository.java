package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.ProduceInventory;
import com.farm_procurement_system.model.ProduceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProduceInventoryRepository extends JpaRepository<ProduceInventory, Long> {
    Optional<ProduceInventory> findByProduceCategory(ProduceCategory category);
}