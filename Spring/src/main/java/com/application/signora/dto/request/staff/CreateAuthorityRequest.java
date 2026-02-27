package com.application.signora.dto.request.staff;

import lombok.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateAuthorityRequest {

    private String firstName;

    private String lastName;

    private String employeeId;

    private String designation;

    private Long collegeId;

    private Long departmentId;

    private Long batchId;
}
