package com.application.signora.dto.response.batchdetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.internal.build.AllowNonPortable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetBatchDetailsByDepartment {

    BatchDetailsByDepartmentInfo batchDetailsByDepartment;

}
