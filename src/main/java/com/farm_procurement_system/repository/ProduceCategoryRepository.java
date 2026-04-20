package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.ProduceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduceCategoryRepository extends JpaRepository<ProduceCategory, Long> {
	boolean existsByCategoryNameIgnoreCase(String categoryName);
}