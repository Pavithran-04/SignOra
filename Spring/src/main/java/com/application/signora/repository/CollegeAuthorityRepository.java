package com.application.signora.repository;

import com.application.signora.entity.CollegeAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollegeAuthorityRepository extends JpaRepository<CollegeAuthority, Long> {
    Optional<CollegeAuthority> findByEmpId(String empId);

    boolean existsByEmpId(String employeeId);
}
