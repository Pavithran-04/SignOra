package com.application.signora.controller;

import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.dto.request.RegisterUserRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.FormResponse;
import com.application.signora.dto.response.user.LoginResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
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
