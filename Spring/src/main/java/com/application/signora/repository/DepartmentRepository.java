package com.application.signora.repository;

import com.application.signora.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    boolean existsByName(String departmentName);

    Optional<Department> findByName(String departmentName);
    
    List<Department> findAllByCollegeId(Long collegeId);
}
