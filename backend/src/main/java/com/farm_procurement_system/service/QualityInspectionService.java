package com.farm_procurement_system.service;

import com.farm_procurement_system.dto.InspectionCreateRequest;
import com.farm_procurement_system.model.*;
import com.farm_procurement_system.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class QualityInspectionService {

    private final QualityInspectionRepository inspectionRepo;
    private final QualityGradeRepository gradeRepo;
    private final FarmProduceRepository produceRepo;
    private final UserRepository userRepository;

    public QualityInspectionService(QualityInspectionRepository inspectionRepo,
                                    QualityGradeRepository gradeRepo,
                                    FarmProduceRepository produceRepo,
                                    UserRepository userRepository) {
        this.inspectionRepo = inspectionRepo;
        this.gradeRepo = gradeRepo;
        this.produceRepo = produceRepo;
        this.userRepository = userRepository;
    }

    public QualityInspection inspect(InspectionCreateRequest request) {
        if (request.getProduceId() == null || request.getInspectorId() == null || request.getQualityScore() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "produceId, inspectorId and qualityScore are required");
        }

        if (request.getQualityScore() < 0 || request.getQualityScore() > 100) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "qualityScore must be between 0 and 100");
        }

        FarmProduce produce = produceRepo.findById(request.getProduceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid produceId"));

        User inspector = userRepository.findById(request.getInspectorId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid inspectorId"));

        if (inspector.getRole() != Role.QUALITY_INSPECTOR) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Selected user is not an inspector");
        }

        if (produce.getProduceStatus() == ProduceStatus.REJECTED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rejected produce cannot be inspected again");
        }

        int score = request.getQualityScore();
        QualityInspection inspection = new QualityInspection();
        inspection.setFarmProduce(produce);
        inspection.setInspector(inspector);
        inspection.setQualityScore(score);
        inspection.setInspectionDate(LocalDate.now().toString());

        if (score < 40) {
            inspection.setAssignedGrade(null);
            inspection.setInspectionStatus(InspectionStatus.REJECTED);
            produce.setProduceStatus(ProduceStatus.REJECTED);
        } else {
            QualityGrade grade = gradeRepo.findByMinScoreLessThanEqualAndMaxScoreGreaterThanEqual(score, score)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                            "No grade configured for score: " + score));

            inspection.setAssignedGrade(grade);
            inspection.setInspectionStatus(InspectionStatus.APPROVED);
            produce.setProduceStatus(ProduceStatus.GRADED);
        }

        produceRepo.save(produce);

        return inspectionRepo.save(inspection);
    }

    public List<QualityInspection> getAll() {
        return inspectionRepo.findAll();
    }
}