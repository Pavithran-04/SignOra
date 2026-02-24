package com.application.signora.dto.response.college;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@JsonPropertyOrder({
        "id",
        "name"
})
public class CollegeResponse extends DefaultResponseEntity {

    private Long id;
    private String name;

}
