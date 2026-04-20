package com.farm_procurement_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.farm_procurement_system.dto.ProcurementCreateRequest;
import com.farm_procurement_system.model.ProcurementOrder;
import com.farm_procurement_system.service.ProcurementService;

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