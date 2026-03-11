package com.application.signora.serviceimpl;

import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.dto.response.user.LoginResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.entity.*;
import com.application.signora.repository.AdminRepository;
import com.application.signora.repository.AuthorityRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.repository.UserRepository;
import com.application.signora.service.UserService;
import com.application.signora.utility.UserServiceUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserServiceUtil userServiceUtil;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse loginUser(LoginUserRequest loginUserRequest) {

        User loggedUser = userRepository.findByUsername(
                loginUserRequest.getUsername()
        ).orElseThrow(() ->
                new RuntimeException("Username or Password is incorrect")
        );

        if (!passwordEncoder.matches(
                loginUserRequest.getPassword(),
                loggedUser.getPassword())) {
            throw new RuntimeException("Username or Password is incorrect");
        }

        Long userId;
        if(loggedUser.getRole().equals("STUDENT")) {
            userId = studentRepository.findByUserId(loggedUser.getId()).get().getId();
        } else {
            userId = authorityRepository.findByUser_Id(loggedUser.getId()).get().getId();
        }

        return LoginResponse.builder()
                .id(loggedUser.getId())
                .role(loggedUser.getRole())
                .username(loggedUser.getUsername())
                .userId(userId)
                .build();
    }

}

