package com.application.signora.dto.response.student;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.batchdetails.BatchDetailsResponse;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@JsonPropertyOrder({
        "id",
        "firstName",
        "lastName",
        "rollNo",
        "batchDetails"
})
public class StudentResponse extends DefaultResponseEntity {
    private Long id;
    private String firstName;
    private String lastName;
    private String rollNo;
    private BatchDetailsResponse batchDetails;
}
