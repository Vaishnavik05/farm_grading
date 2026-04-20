package com.farm_procurement_system.controller;

import com.farm_procurement_system.model.ProduceInventory;
import com.farm_procurement_system.service.InventoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @PostMapping
    public ProduceInventory create(@RequestBody ProduceInventory inventory) {
        return service.save(inventory);
    }
    @GetMapping
    public List<ProduceInventory> getAll() {
        return service.getAll();
    }
}