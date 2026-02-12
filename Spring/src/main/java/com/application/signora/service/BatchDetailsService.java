package com.application.signora.service;

import com.application.signora.dto.request.batchdetails.CreateBatchDetailsRequest;
import com.application.signora.dto.response.batchdetails.CreateBatchDetailsResponse;
import com.application.signora.dto.response.batchdetails.GetBatchDetailsByDepartment;

public interface BatchDetailsService {

    CreateBatchDetailsResponse createBatchDetails(CreateBatchDetailsRequest createBatchDetailsRequest);

    GetBatchDetailsByDepartment getBatchDetailsByDepartment(Long departmentId);
}
