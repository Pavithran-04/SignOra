package com.application.signora.dto.response.college;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollegeInfo {

    private Long id;

    private String name;

    private String address;

    private String code;
}
