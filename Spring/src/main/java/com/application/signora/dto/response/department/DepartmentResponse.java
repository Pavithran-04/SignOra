package com.application.signora.dto.response.department;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.college.CollegeResponse;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@JsonPropertyOrder({
        "id",
        "name",
        "college"
})
public class DepartmentResponse extends DefaultResponseEntity  {
    private Long id;
    private String name;
    private CollegeResponse college;
}
