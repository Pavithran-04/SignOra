package com.application.signora.controller;

import com.application.signora.dto.request.student.UploadCertificateRequest;
import com.application.signora.dto.response.student.UploadCertificateResponse;
import com.application.signora.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CertificateController {

    @Autowired
    CertificateService certificateService;

    @PostMapping("/certificate")
    public UploadCertificateResponse uploadCertificate(@RequestBody UploadCertificateRequest uploadCertificateRequest) {
        return certificateService.certificateUpload(uploadCertificateRequest);
    }
}
