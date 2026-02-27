package com.application.signora.dto.response.authority;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.batchdetails.BatchDetailsResponse;
import com.application.signora.dto.response.college.CollegeResponse;
import com.application.signora.dto.response.department.DepartmentResponse;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@JsonPropertyOrder({
        "id",
        "fullName",
        "employeeId",
        "designation",
        "college",
        "department",
        "createdAt"
})
public class AuthorityDetailsResponse extends DefaultResponseEntity {

    private Long id;
    private String fullName;
    private String employeeId;
    private String designation;

    private CollegeResponse college;
    private DepartmentResponse department;
    private BatchDetailsResponse batch;

}
