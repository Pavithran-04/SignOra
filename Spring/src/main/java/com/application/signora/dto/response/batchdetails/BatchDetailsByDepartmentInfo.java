package com.application.signora.dto.response.batchdetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BatchDetailsByDepartmentInfo {

    private Long departmentId;

    private List<BatchDetailsInfo> batchDetails;

}
