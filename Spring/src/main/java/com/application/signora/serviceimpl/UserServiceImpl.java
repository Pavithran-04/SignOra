package com.application.signora.serviceimpl;

import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.dto.request.RegisterUserRequest;
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


    @Transactional
    public RegisterUserResponse registerUser(RegisterUserRequest request) {
        if(userServiceUtil.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User savedUser = userRepository.save(
                User.builder()
                        .role(request.getRole())
                        .username(request.getUsername())
                        .password(encoder.encode(request.getPassword()))
                        .build()
        );

        if(userServiceUtil.isStaff(request.getRole())) {
            Authority staff = authorityRepository.findByEmpId(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("Invalid employee id"));
            if(!Objects.isNull(staff.getUser()))
                throw new RuntimeException(request.getIdentifier() + " already has been registered");
            staff.setUser(savedUser);
            authorityRepository.save(staff);
        } else if (userServiceUtil.isStudent(request.getRole())) {
            Student student = studentRepository.findByRollNo(request.getIdentifier())
                    .orElseThrow(() -> new RuntimeException("Invalid roll number"));
            if(!Objects.isNull(student.getUser()))
                throw new RuntimeException(request.getIdentifier() + " already has been registered");
            student.setUser(savedUser);
            studentRepository.save(student);
        }

        return RegisterUserResponse.builder()
                .message("User has been successfully registered")
                .status(HttpStatus.OK)
                .build();
    }

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

        return LoginResponse.builder()
                .id(loggedUser.getId())
                .role(loggedUser.getRole())
                .username(loggedUser.getUsername())
                .build();
    }




}

