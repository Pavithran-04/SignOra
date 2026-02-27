package com.application.signora.repository;

import com.application.signora.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Optional<Authority> findByEmpId(String empId);

    boolean existsByEmpId(String employeeId);

    Optional<Authority> findByUserId(Long identifier);
}
