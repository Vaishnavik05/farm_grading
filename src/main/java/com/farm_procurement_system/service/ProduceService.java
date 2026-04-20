package com.farm_procurement_system.service;

import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.FarmProduceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProduceService {

    private final FarmProduceRepository repo;

    public ProduceService(FarmProduceRepository repo) {
        this.repo = repo;
    }

    public FarmProduce create(FarmProduce produce) {

        // default status
        produce.setProduceStatus(ProduceStatus.SUBMITTED);

        return repo.save(produce);
    }

    public List<FarmProduce> getAll() {
        return repo.findAll();
    }
}