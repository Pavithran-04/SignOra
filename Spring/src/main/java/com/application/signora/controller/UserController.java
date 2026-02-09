package com.application.signora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.dto.request.RegisterUserRequest;
import com.application.signora.dto.response.user.LoginResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/admin/user/register")
    public RegisterUserResponse createUser(@RequestBody RegisterUserRequest request) {
        return service.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody LoginUserRequest loginUserRequest) {
        return service.loginUser(loginUserRequest);
    }

}
