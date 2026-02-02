package com.application.signora.repository;

import com.application.signora.entity.Staff;
import com.application.signora.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    public Optional<Staff> findByEmpId(String empId);
}
