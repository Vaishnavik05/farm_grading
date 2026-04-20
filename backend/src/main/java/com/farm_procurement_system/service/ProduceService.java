package com.farm_procurement_system.service;

import com.farm_procurement_system.dto.ProduceCreateRequest;
import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.FarmProduceRepository;
import com.farm_procurement_system.repository.ProduceCategoryRepository;
import com.farm_procurement_system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProduceService {

    private final FarmProduceRepository repo;
    private final UserRepository userRepository;
    private final ProduceCategoryRepository produceCategoryRepository;

    public ProduceService(FarmProduceRepository repo,
                          UserRepository userRepository,
                          ProduceCategoryRepository produceCategoryRepository) {
        this.repo = repo;
        this.userRepository = userRepository;
        this.produceCategoryRepository = produceCategoryRepository;
    }

    public FarmProduce create(ProduceCreateRequest request) {
        if (request.getFarmerId() == null || request.getCategoryId() == null
                || request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "farmerId, categoryId and positive quantity are required");
        }

        User farmer = userRepository.findById(request.getFarmerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid farmerId"));

        if (farmer.getRole() != Role.FARMER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected user is not a farmer");
        }

        ProduceCategory category = produceCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid categoryId"));

        FarmProduce produce = new FarmProduce();
        produce.setFarmer(farmer);
        produce.setProduceCategory(category);
        produce.setQuantity(request.getQuantity());
        produce.setUnitType(request.getUnitType() == null ? UnitType.KG : request.getUnitType());
        produce.setHarvestDate(request.getHarvestDate());

        produce.setProduceStatus(ProduceStatus.SUBMITTED);

        return repo.save(produce);
    }

    public List<FarmProduce> getAll() {
        return repo.findAll();
    }

    public List<ProduceCategory> getCategories() {
        List<ProduceCategory> categories = produceCategoryRepository.findAll();
        if (!categories.isEmpty()) {
            return categories;
        }

        List<ProduceCategory> defaults = new ArrayList<>();
        defaults.add(buildCategory("Wheat", "Cereal grain"));
        defaults.add(buildCategory("Rice", "Staple grain"));
        defaults.add(buildCategory("Corn", "Maize crop"));
        defaults.add(buildCategory("Tomato", "Vegetable crop"));
        defaults.add(buildCategory("Potato", "Root vegetable"));

        return produceCategoryRepository.saveAll(defaults);
    }

    private ProduceCategory buildCategory(String name, String description) {
        ProduceCategory category = new ProduceCategory();
        category.setCategoryName(name);
        category.setDescription(description);
        return category;
    }
}