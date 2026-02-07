package com.application.signora.dto.request.staff;

import lombok.Data;

@Data
public class CreateStaffRequest {

    private String name;

    private String employeeId;

    private String departmentName;

    private Boolean isHod;

    private Boolean isFaculty;

    private Boolean isPrincipal;

}
