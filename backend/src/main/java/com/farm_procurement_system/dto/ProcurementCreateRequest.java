package com.farm_procurement_system.dto;

import lombok.Data;

@Data
public class ProcurementCreateRequest {
    private Long produceId;
    private Long officerId;
    private Double procurementQuantity;
    private Double unitPrice;
}
