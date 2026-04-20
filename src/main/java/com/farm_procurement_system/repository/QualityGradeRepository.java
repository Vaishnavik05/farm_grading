package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.QualityGrade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface QualityGradeRepository extends JpaRepository<QualityGrade, Long> {
    boolean existsByGradeNameIgnoreCase(String gradeName);

    Optional<QualityGrade> findByMinScoreLessThanEqualAndMaxScoreGreaterThanEqual(int min, int max);
}