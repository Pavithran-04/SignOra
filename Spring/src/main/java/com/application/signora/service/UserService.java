package com.application.signora.service;

import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.dto.request.RegisterUserRequest;
import com.application.signora.dto.response.user.LoginResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.entity.User;

public interface UserService {
    RegisterUserResponse registerUser(RegisterUserRequest request);
    LoginResponse loginUser(LoginUserRequest loginUserRequest);

}
