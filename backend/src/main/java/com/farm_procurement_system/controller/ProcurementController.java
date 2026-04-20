package com.farm_procurement_system.controller;

import com.farm_procurement_system.dto.ProcurementCreateRequest;
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
    public ProcurementOrder create(@RequestBody ProcurementCreateRequest request) {
        return service.create(request);
    }

    @GetMapping
    public List<ProcurementOrder> getAll() {
        return service.getAll();
    }
}