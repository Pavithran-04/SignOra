package com.application.signora.dto.request.student;

import lombok.Data;

@Data
public class CreateStudentRequest {

    private String firstName;

    private String lastName;

    private String rollNo;

    private Long batchId;

    private String username;

    private String password;

}
