package com.application.signora.dto.request.student;

import lombok.Data;

@Data
public class FormRequest {

    private String requestBody;

    private String requestTitle;

    private Boolean isHodApprovalRequired;

    private Boolean isPrincipalApprovalRequired;

}
