package com.farm_procurement_system.service;

import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QualityInspectionService {

    private final QualityInspectionRepository inspectionRepo;
    private final QualityGradeRepository gradeRepo;
    private final FarmProduceRepository produceRepo;

    public QualityInspectionService(QualityInspectionRepository inspectionRepo,
                             QualityGradeRepository gradeRepo,
                             FarmProduceRepository produceRepo) {
        this.inspectionRepo = inspectionRepo;
        this.gradeRepo = gradeRepo;
        this.produceRepo = produceRepo;
    }

    public QualityInspection inspect(QualityInspection inspection) {

        int score = inspection.getQualityScore();

        // 🔥 GRADING LOGIC
        QualityGrade grade;

        if (score >= 85) {
            grade = gradeRepo.findById(1L).orElse(null); // Grade A
        } else if (score >= 60) {
            grade = gradeRepo.findById(2L).orElse(null); // Grade B
        } else {
            grade = gradeRepo.findById(3L).orElse(null); // Grade C
        }

        inspection.setAssignedGrade(grade);
        inspection.setInspectionStatus(InspectionStatus.APPROVED);

        // Update produce status
        FarmProduce produce = inspection.getFarmProduce();
        produce.setProduceStatus(ProduceStatus.GRADED);
        produceRepo.save(produce);

        return inspectionRepo.save(inspection);
    }

    public List<QualityInspection> getAll() {
        return inspectionRepo.findAll();
    }
}