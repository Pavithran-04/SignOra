package com.application.signora.dto.response.department;

import com.application.signora.dto.response.DefaultResponseEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GetDepartmentsByCollegeResponse extends DefaultResponseEntity {

    List<DepartmentInfo> departments;

}
