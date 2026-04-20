package com.farm_procurement_system.service;

import com.farm_procurement_system.dto.ProcurementCreateRequest;
import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProcurementService {

    private final ProcurementOrderRepository orderRepo;
    private final ProduceInventoryRepository inventoryRepo;
    private final FarmProduceRepository produceRepository;
    private final UserRepository userRepository;

    public ProcurementService(ProcurementOrderRepository orderRepo,
                              ProduceInventoryRepository inventoryRepo,
                              FarmProduceRepository produceRepository,
                              UserRepository userRepository) {
        this.orderRepo = orderRepo;
        this.inventoryRepo = inventoryRepo;
        this.produceRepository = produceRepository;
        this.userRepository = userRepository;
    }

    public ProcurementOrder create(ProcurementCreateRequest request) {
        if (request.getProduceId() == null || request.getOfficerId() == null
                || request.getProcurementQuantity() == null || request.getUnitPrice() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "produceId, officerId, procurementQuantity and unitPrice are required");
        }

        if (request.getProcurementQuantity() <= 0 || request.getUnitPrice() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "procurementQuantity and unitPrice must be positive");
        }

        FarmProduce produce = produceRepository.findById(request.getProduceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid produceId"));

        User officer = userRepository.findById(request.getOfficerId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid officerId"));

        if (officer.getRole() != Role.PROCUREMENT_OFFICER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected user is not a procurement officer");
        }

        if (produce.getProduceStatus() != ProduceStatus.GRADED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Only graded produce can be procured");
        }

        ProcurementOrder order = new ProcurementOrder();
        order.setFarmProduce(produce);
        order.setProcurementOfficer(officer);
        order.setProcurementQuantity(request.getProcurementQuantity());
        order.setUnitPrice(request.getUnitPrice());
        order.setOrderDate(LocalDate.now().toString());

        double total = order.getProcurementQuantity() * order.getUnitPrice();
        order.setTotalAmount(total);

        order.setOrderStatus(OrderStatus.CREATED);

        ProduceCategory category = produce.getProduceCategory();

        ProduceInventory inventory = inventoryRepo
                .findByProduceCategory(category)
                .orElse(new ProduceInventory());

        inventory.setProduceCategory(category);

        double current = inventory.getAvailableQuantity() == null ? 0 : inventory.getAvailableQuantity();

        double updated = current + order.getProcurementQuantity();
        inventory.setAvailableQuantity(updated);
        if (updated == 0) {
            inventory.setInventoryStatus(InventoryStatus.OUT_OF_STOCK);
        } else if (updated < 50) {
            inventory.setInventoryStatus(InventoryStatus.LOW_STOCK);
        } else {
            inventory.setInventoryStatus(InventoryStatus.AVAILABLE);
        }

        inventoryRepo.save(inventory);

        return orderRepo.save(order);
    }

    public List<ProcurementOrder> getAll() {
        return orderRepo.findAll();
    }
}