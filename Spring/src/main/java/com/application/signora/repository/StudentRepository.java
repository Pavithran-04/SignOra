package com.application.signora.repository;

import com.application.signora.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNo(String rollNo);

    boolean existsByRollNo(String rollNo);

//    @Query(name = """
//                SELECT *
//                FROM STUDENT
//                WHERE REGISTERED_USER_ID = :REGISTERED_USER_ID
//            """, nativeQuery = true)
//    Optional<Student> findByUserId(@Param("REGISTERED_USER_ID") Long registeredUserId);

    Optional<Student> findByUserId(Long registeredUserId);
}
