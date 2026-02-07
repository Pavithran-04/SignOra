package com.application.signora.repository;

import com.application.signora.entity.ApprovalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalInfoRepository extends JpaRepository<ApprovalInfo, Long> {

}
