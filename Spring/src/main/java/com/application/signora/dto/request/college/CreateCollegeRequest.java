package com.application.signora.dto.request.college;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateCollegeRequest {

    private String name;

    private String address;

    private String code;

}
