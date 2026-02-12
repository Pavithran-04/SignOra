package com.application.signora.utility;

import com.application.signora.dto.request.batchdetails.CreateBatchDetailsRequest;
import com.application.signora.dto.response.batchdetails.BatchDetailsByDepartmentInfo;
import com.application.signora.dto.response.batchdetails.BatchDetailsInfo;
import com.application.signora.dto.response.batchdetails.CreateBatchDetailsResponse;
import com.application.signora.dto.response.batchdetails.GetBatchDetailsByDepartment;
import com.application.signora.entity.BatchDetails;
import com.application.signora.repository.BatchDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BatchDetailsUtil {

    @Autowired
    BatchDetailsRepository batchDetailsRepository;

    public boolean isValidYear(Integer startYear, Integer endYear) {
        return (endYear - startYear == 3) || (endYear - startYear == 4);
    }

    public CreateBatchDetailsResponse convertIntoResponse(BatchDetails batchDetails) {
        return CreateBatchDetailsResponse.builder()
                .id(batchDetails.getId())
                .startYear(batchDetails.getStartYear())
                .endYear(batchDetails.getEndYear())
                .departmentId(batchDetails.getDepartment().getId())
                .collegeId(batchDetails.getDepartment().getCollege().getId())
                .status(HttpStatus.OK)
                .build();
    }

    public boolean isValidBatchDetail(CreateBatchDetailsRequest createBatchDetailsRequest) {
        return batchDetailsRepository.isValidBatchDetail(
                createBatchDetailsRequest.getStartYear(),
                createBatchDetailsRequest.getEndYear(),
                createBatchDetailsRequest.getDepartmentId()
        ) == 0;
    }

    public GetBatchDetailsByDepartment getBatchDetailsByDepartment(Long departmentId) {
        List<BatchDetailsInfo> batchDetailsInfoList = batchDetailsRepository.findAllByDepartmentId(departmentId).stream().map(batchDetails -> {
            return BatchDetailsInfo.builder()
                    .id(batchDetails.getId())
                    .startYear(batchDetails.getStartYear())
                    .endYear(batchDetails.getEndYear())
                    .build();
        }).collect(Collectors.toList());

        return GetBatchDetailsByDepartment.builder()
                .batchDetailsByDepartment(
                        BatchDetailsByDepartmentInfo.builder()
                                .departmentId(departmentId)
                                .batchDetails(batchDetailsInfoList)
                                .build()
                )
                .build();
    }
}
