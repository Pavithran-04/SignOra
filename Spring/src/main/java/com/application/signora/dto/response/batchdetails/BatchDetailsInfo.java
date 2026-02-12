package com.application.signora.dto.response.batchdetails;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BatchDetailsInfo {

    private Long id;

    private Integer startYear;

    private Integer endYear;

}
