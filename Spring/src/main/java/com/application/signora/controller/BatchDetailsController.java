package com.application.signora.controller;

import com.application.signora.dto.request.batchdetails.CreateBatchDetailsRequest;
import com.application.signora.dto.response.batchdetails.CreateBatchDetailsResponse;
import com.application.signora.dto.response.batchdetails.GetBatchDetailsByDepartment;
import com.application.signora.entity.BatchDetails;
import com.application.signora.service.BatchDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class BatchDetailsController {

    @Autowired
    BatchDetailsService batchDetailsService;

    @PostMapping("/batch-details")
    public CreateBatchDetailsResponse createBatchDetails(@RequestBody CreateBatchDetailsRequest createBatchDetailsRequest) {
        return batchDetailsService.createBatchDetails(createBatchDetailsRequest);
    }

    @GetMapping("/batch-details")
    public GetBatchDetailsByDepartment getBatchDetailsByDepartment(@RequestParam Long departmentId) {
        return  batchDetailsService.getBatchDetailsByDepartment(departmentId);
    }
}
