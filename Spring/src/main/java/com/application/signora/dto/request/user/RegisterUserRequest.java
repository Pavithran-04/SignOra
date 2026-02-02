package com.application.signora.dto.request.user;

import lombok.Data;

@Data
public class RegisterUserRequest {
    private String username;
    private String password;
    private String role;
    private String identifier;
}
