package com.application.signora.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ValidationErrorResponse {
    private String status;
    private List<ValidationErrorInfo> validationErrorInfo;
}

