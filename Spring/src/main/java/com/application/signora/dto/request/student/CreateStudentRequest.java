package com.application.signora.dto.request.student;

import lombok.Data;

@Data
public class CreateStudentRequest {

    private String name;

    private String rollNo;

    private String departmentName;

    private Integer startYear;

    private Integer endYear;

}
