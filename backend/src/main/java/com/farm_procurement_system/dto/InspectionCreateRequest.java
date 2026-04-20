package com.farm_procurement_system.dto;

import lombok.Data;

@Data
public class InspectionCreateRequest {
    private Long produceId;
    private Long inspectorId;
    private Integer qualityScore;
}
