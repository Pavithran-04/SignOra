package com.application.signora.repository;

import com.application.signora.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNo(String rollNo);

    boolean existsByRollNo(String rollNo);

    Optional<Student> findByUserId(Long registeredUserId);

    @Query(value = """
                SELECT
                    *
                FROM STUDENT
                WHERE BATCH_ID = :BATCH_ID
            """, nativeQuery = true)
    List<Student> findByBatchId(@Param("BATCH_ID") Long batchId);

}
