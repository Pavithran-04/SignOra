package com.application.signora.dto.response.college;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.entity.College;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = false)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class CreateCollegeResponse extends DefaultResponseEntity {

    private Long id;

    private String name;

    private String address;

    private String code;

}
