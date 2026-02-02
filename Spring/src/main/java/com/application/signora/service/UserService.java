package com.application.signora.service;

import com.application.signora.dto.request.user.RegisterUserRequest;
import com.application.signora.dto.response.user.RegisterUserResponse;

public interface UserService {
    RegisterUserResponse registerUser(RegisterUserRequest request);
}
