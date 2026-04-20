package com.farm_procurement_system.service;

import com.farm_procurement_system.model.ProduceInventory;
import com.farm_procurement_system.model.ProduceCategory;
import com.farm_procurement_system.repository.ProduceCategoryRepository;
import com.farm_procurement_system.repository.ProduceInventoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InventoryService {

    private final ProduceInventoryRepository repo;
    private final ProduceCategoryRepository produceCategoryRepository;

    public InventoryService(ProduceInventoryRepository repo, ProduceCategoryRepository produceCategoryRepository) {
        this.repo = repo;
        this.produceCategoryRepository = produceCategoryRepository;
    }

    public List<ProduceInventory> getAll() {
        return repo.findAll();
    }

    public ProduceInventory save(ProduceInventory inventory) {
        if (inventory == null || inventory.getProduceCategory() == null
                || inventory.getProduceCategory().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "produceCategory.id is required");
        }

        Long categoryId = inventory.getProduceCategory().getId();
        ProduceCategory category = produceCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid produce category id: " + categoryId));

        inventory.setProduceCategory(category);
        return repo.save(inventory);
    }
}