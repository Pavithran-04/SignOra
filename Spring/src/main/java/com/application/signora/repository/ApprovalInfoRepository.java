package com.application.signora.repository;

import com.application.signora.entity.ApprovalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApprovalInfoRepository extends JpaRepository<ApprovalInfo, Long> {

    @Query(value = "SELECT * FROM APPROVAL_INFO WHERE REQUEST_ID = :REQUEST_ID",
            nativeQuery = true)
    Optional<ApprovalInfo> findByRequestId(@Param("REQUEST_ID") Long requestId);

}
