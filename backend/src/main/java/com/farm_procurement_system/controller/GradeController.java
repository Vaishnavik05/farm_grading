package com.farm_procurement_system.controller;

import com.farm_procurement_system.model.QualityGrade;
import com.farm_procurement_system.repository.QualityGradeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/grades")
public class GradeController {

    private final QualityGradeRepository repo;

    public GradeController(QualityGradeRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public QualityGrade create(@RequestBody QualityGrade grade) {
        if (StringUtils.hasText(grade.getGradeName()) && repo.existsByGradeNameIgnoreCase(grade.getGradeName().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Quality grade name already exists");
        }

        return repo.save(grade);
    }

    @GetMapping
    public List<QualityGrade> getAll() {
        return repo.findAll();
    }
}