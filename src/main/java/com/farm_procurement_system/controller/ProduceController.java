package com.farm_procurement_system.controller;

import com.farm_procurement_system.model.FarmProduce;
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
    public FarmProduce create(@RequestBody FarmProduce produce) {
        return service.create(produce);
    }

    @GetMapping
    public List<FarmProduce> getAll() {
        return service.getAll();
    }
}