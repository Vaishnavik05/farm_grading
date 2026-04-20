package com.farm_procurement_system.service;

import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcurementService {

    private final ProcurementOrderRepository orderRepo;
    private final ProduceInventoryRepository inventoryRepo;

    public ProcurementService(ProcurementOrderRepository orderRepo,
                              ProduceInventoryRepository inventoryRepo) {
        this.orderRepo = orderRepo;
        this.inventoryRepo = inventoryRepo;
    }

    public ProcurementOrder create(ProcurementOrder order) {

        FarmProduce produce = order.getFarmProduce();

        // ❗ Rule: Only graded produce allowed
        if (produce.getProduceStatus() != ProduceStatus.GRADED) {
            throw new RuntimeException("Produce must be graded before procurement!");
        }

        // 💰 Total calculation
        double total = order.getProcurementQuantity() * order.getUnitPrice();
        order.setTotalAmount(total);

        order.setOrderStatus(OrderStatus.CREATED);

        // 📦 Inventory Update
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