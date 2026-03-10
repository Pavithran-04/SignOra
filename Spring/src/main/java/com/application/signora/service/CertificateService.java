package com.application.signora.service;

import com.application.signora.dto.request.student.UploadCertificateRequest;
import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.student.UploadCertificateResponse;

public interface CertificateService {

    UploadCertificateResponse certificateUpload(UploadCertificateRequest uploadCertificateRequest);

}
