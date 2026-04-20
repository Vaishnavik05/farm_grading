package com.farm_procurement_system.controller;

import com.farm_procurement_system.model.ProcurementOrder;
import com.farm_procurement_system.service.ProcurementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procurement")
public class ProcurementController {

    private final ProcurementService service;

    public ProcurementController(ProcurementService service) {
        this.service = service;
    }

    @PostMapping
    public ProcurementOrder create(@RequestBody ProcurementOrder order) {
        return service.create(order);
    }

    @GetMapping
    public List<ProcurementOrder> getAll() {
        return service.getAll();
    }
}