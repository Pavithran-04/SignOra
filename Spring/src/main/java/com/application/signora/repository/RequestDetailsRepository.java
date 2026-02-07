package com.application.signora.repository;

import com.application.signora.entity.RequestDetails;
import org.apache.coyote.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestDetailsRepository extends JpaRepository<RequestDetails, Long> {
    List<RequestDetails> findByStudentId(Long studentId);
}
