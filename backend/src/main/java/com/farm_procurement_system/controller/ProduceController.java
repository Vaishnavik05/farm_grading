package com.farm_procurement_system.controller;

import com.farm_procurement_system.dto.ProduceCreateRequest;
import com.farm_procurement_system.model.FarmProduce;
import com.farm_procurement_system.model.ProduceCategory;
import com.farm_procurement_system.service.ProduceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produce")
public class ProduceController {

    private final ProduceService service;

    public ProduceController(ProduceService service) {
        this.service = service;
    }

    @PostMapping
    public FarmProduce create(@RequestBody ProduceCreateRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<FarmProduce> getAll() {
        return service.getAll();
    }

    @GetMapping("/categories")
    public List<ProduceCategory> getCategories() {
        return service.getCategories();
    }
}