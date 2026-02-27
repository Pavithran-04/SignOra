package com.application.signora.repository;

import com.application.signora.entity.BatchDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BatchDetailsRepository extends JpaRepository<BatchDetails, Long> {

    @Query(
            value = """
                        SELECT
                            COUNT(ID)
                        FROM BATCH_DETAILS
                        WHERE START_YEAR = :START_YEAR
                        AND END_YEAR = :END_YEAR
                        AND DEPARTMENT_ID = :DEPARTMENT_ID
                        AND STATUS = "ACTIVE"
                    """,
            nativeQuery = true
    )
    long isValidBatchDetail(@Param("START_YEAR") Integer startYear, @Param("END_YEAR") Integer endYear, @Param("DEPARTMENT_ID") Long departmentId);

    List<BatchDetails> findAllByDepartmentId(Long departmentId);

    Optional<BatchDetails> findByFacultyId(Long id);
}
