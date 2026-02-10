package com.application.signora.dto.request.department;

import lombok.Data;

@Data
public class CreateDepartmentRequest {

    private String name;

    private Long collegeId;

}
