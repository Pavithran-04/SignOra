package com.application.signora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.dto.request.user.LoginRequest;
import com.application.signora.dto.response.user.GetAccessTokenResponse;
import com.application.signora.service.AuthService;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/token")
    public GetAccessTokenResponse getAccessToken(@RequestBody LoginRequest loginRequest) {
        try {
            return authService.getAccessToken(loginRequest.getUsername(), loginRequest.getPassword());
        } catch (Exception ex) {
            return GetAccessTokenResponse.builder().status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
