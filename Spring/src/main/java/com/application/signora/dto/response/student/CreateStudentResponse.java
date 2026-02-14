package com.application.signora.dto.response.student;

import com.application.signora.dto.response.DefaultResponseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = false)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CreateStudentResponse extends DefaultResponseEntity {

    private Long id;

    private String firstName;

    private String lastName;

    private String rollNo;

    private String username;

    private Long collegeId;

    private Long departmentId;

    private Long batchId;

}
