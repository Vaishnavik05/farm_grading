package com.farm_procurement_system.controller;

import com.farm_procurement_system.model.QualityInspection;
import com.farm_procurement_system.service.QualityInspectionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inspections")
public class InspectionController {

    private final QualityInspectionService service;

    public InspectionController(QualityInspectionService service) {
        this.service = service;
    }

    @PostMapping
    public QualityInspection inspect(@RequestBody QualityInspection inspection) {
        return service.inspect(inspection);
    }

    @GetMapping
    public List<QualityInspection> getAll() {
        return service.getAll();
    }
}