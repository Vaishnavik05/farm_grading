package com.farm_procurement_system.service;

import com.farm_procurement_system.model.ProduceInventory;
import com.farm_procurement_system.repository.ProduceInventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final ProduceInventoryRepository repo;

    public InventoryService(ProduceInventoryRepository repo) {
        this.repo = repo;
    }

    public ProduceInventory save(ProduceInventory inventory) {
        return repo.save(inventory);
    }

    public List<ProduceInventory> getAll() {
        return repo.findAll();
    }
}