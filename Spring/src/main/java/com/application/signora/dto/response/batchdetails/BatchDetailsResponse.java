package com.application.signora.dto.response.batchdetails;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.department.DepartmentResponse;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@JsonPropertyOrder({
        "id",
        "startYear",
        "endYear",
        "department"
})
public class BatchDetailsResponse extends DefaultResponseEntity {

    private Long id;
    private int startYear;
    private int endYear;
    private DepartmentResponse department;

}
