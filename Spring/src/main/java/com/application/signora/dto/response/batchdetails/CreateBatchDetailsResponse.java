package com.application.signora.dto.response.batchdetails;


import com.application.signora.dto.response.DefaultResponseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = false)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CreateBatchDetailsResponse extends DefaultResponseEntity {

    private Long id;

    private Integer startYear;

    private Integer endYear;

    private Long departmentId;

    private Long collegeId;

}
