package com.farm_procurement_system.dto;

import com.farm_procurement_system.model.UnitType;
import lombok.Data;

@Data
public class ProduceCreateRequest {
    private Long farmerId;
    private Long categoryId;
    private Double quantity;
    private UnitType unitType;
    private String harvestDate;
}
