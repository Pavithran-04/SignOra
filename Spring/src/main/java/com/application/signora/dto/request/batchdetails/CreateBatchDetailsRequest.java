package com.application.signora.dto.request.batchdetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalIdCache;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBatchDetailsRequest {

    private Integer startYear;

    private Integer endYear;

    private Long departmentId;

}
