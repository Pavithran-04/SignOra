package com.application.signora.serviceimpl;

import com.application.signora.dto.request.student.UploadCertificateRequest;
import com.application.signora.dto.response.student.UploadCertificateResponse;
import com.application.signora.entity.CertificateInfo;
import com.application.signora.entity.RequestDetails;
import com.application.signora.repository.CertificateInfoRepository;
import com.application.signora.repository.RequestDetailsRepository;
import com.application.signora.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    CertificateInfoRepository certificateInfoRepository;

    @Autowired
    RequestDetailsRepository requestDetailsRepository;

    @Override
    public UploadCertificateResponse certificateUpload(UploadCertificateRequest request) {

        RequestDetails requestDetails = requestDetailsRepository
                .findById(request.getRequestId())
                .orElseThrow(() -> new RuntimeException("Invalid request form id"));

        Optional<CertificateInfo> existingCertificate =
                certificateInfoRepository.findByRequestDetails(requestDetails);

        if (existingCertificate.isPresent()) {
            CertificateInfo certificateInfo = existingCertificate.get();
            certificateInfo.setLink(request.getLink());
            certificateInfoRepository.save(certificateInfo);
        } else {
            certificateInfoRepository.save(
                    CertificateInfo.builder()
                            .requestDetails(requestDetails)
                            .link(request.getLink())
                            .build()
            );
        }

        return UploadCertificateResponse.builder()
                .message("Certificate link has been added successfully")
                .status(HttpStatus.ACCEPTED)
                .build();
    }
}
