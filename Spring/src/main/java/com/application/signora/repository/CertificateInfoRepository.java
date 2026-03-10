package com.application.signora.repository;

import com.application.signora.entity.CertificateInfo;
import com.application.signora.entity.RequestDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.atomic.LongAccumulator;

@Repository
public interface CertificateInfoRepository extends JpaRepository<CertificateInfo, Long> {

    Optional<CertificateInfo> findByRequestDetails(RequestDetails requestDetails);

}
