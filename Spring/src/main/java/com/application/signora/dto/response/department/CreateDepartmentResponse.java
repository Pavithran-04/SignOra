package com.application.signora.dto.response.department;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateDepartmentResponse {

    private Long id;

    private String name;

    private Long collegeId;

}
