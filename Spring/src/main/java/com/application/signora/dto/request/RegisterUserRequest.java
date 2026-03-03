package com.application.signora.dto.request;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private String username;
    private String password;
    private String role; // STUDENT, PRINCIPAL, HOD, FACULTY
    private String identifier;
}
