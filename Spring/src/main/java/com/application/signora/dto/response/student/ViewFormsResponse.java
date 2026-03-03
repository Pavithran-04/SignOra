package com.application.signora.dto.response.student;

import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.requestforms.RequestFormInfo;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ViewFormsResponse extends DefaultResponseEntity {

    private List<RequestFormInfo> requestForms;

    private Integer totalForms;

}
