package com.application.signora.exception.user;

import com.application.signora.dto.response.ValidationErrorInfo;
import com.application.signora.dto.response.ValidationErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ValidationErrorResponse> runtimeException(RuntimeException exception) {
        List<ValidationErrorInfo> validationErrorInfos = new ArrayList<>();
        validationErrorInfos.add(ValidationErrorInfo.builder().message(exception.getMessage()).build());
        return new ResponseEntity<>(ValidationErrorResponse.builder().validationErrorInfo(validationErrorInfos).status(HttpStatus.BAD_REQUEST.getReasonPhrase()).build(), HttpStatus.OK);
    }
}
