package com.application.signora.controller;

import com.application.signora.dto.request.user.RegisterUserRequest;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/user/register")
    public RegisterUserResponse createUser(@RequestBody RegisterUserRequest request) {
        return service.registerUser(request);
    }

}
