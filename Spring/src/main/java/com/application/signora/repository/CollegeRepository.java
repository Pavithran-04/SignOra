package com.application.signora.repository;

import com.application.signora.entity.College;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {

    boolean existsByName(String name);

    boolean existsByCode(String code);

    List<College> findAllByAdminId(Long id);
}
