package com.application.signora.serviceimpl;

import com.application.signora.dto.request.batchdetails.CreateBatchDetailsRequest;
import com.application.signora.dto.response.batchdetails.CreateBatchDetailsResponse;
import com.application.signora.dto.response.batchdetails.GetBatchDetailsByDepartment;
import com.application.signora.entity.BatchDetails;
import com.application.signora.entity.Department;
import com.application.signora.entity.enums.Status;
import com.application.signora.repository.BatchDetailsRepository;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.service.BatchDetailsService;
import com.application.signora.utility.BatchDetailsUtil;
import com.application.signora.utility.DepartmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BatchDetailsServiceImpl implements BatchDetailsService {

    @Autowired
    BatchDetailsRepository batchDetailsRepository;

    @Autowired
    BatchDetailsUtil batchDetailsUtil;

    @Autowired
    DepartmentUtil departmentUtil;

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public CreateBatchDetailsResponse createBatchDetails(CreateBatchDetailsRequest createBatchDetailsRequest) {

        if(!batchDetailsUtil.isValidYear(createBatchDetailsRequest.getStartYear(), createBatchDetailsRequest.getEndYear())) {
            throw new RuntimeException("Kindly enter the valid year info");
        }

        Department department = departmentUtil.getDeaprtment(createBatchDetailsRequest.getDepartmentId());

        if(!batchDetailsUtil.isValidBatchDetail(createBatchDetailsRequest)) {
            throw new RuntimeException("Duplicate batch details are not allowed for the same department");
        }

        BatchDetails batchDetails = BatchDetails.builder()
                .startYear(createBatchDetailsRequest.getStartYear())
                .endYear(createBatchDetailsRequest.getEndYear())
                .department(department)
                .status(Status.ACTIVE)
                .build();

        batchDetailsRepository.save(batchDetails);

        return batchDetailsUtil.convertIntoResponse(batchDetails);
    }

    @Override
    public GetBatchDetailsByDepartment getBatchDetailsByDepartment(Long departmentId) {
        return batchDetailsUtil.getBatchDetailsByDepartment(departmentId);
    }


}
