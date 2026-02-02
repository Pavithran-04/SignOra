package com.application.signora.serviceimpl;

import com.application.signora.dto.request.user.RegisterUserRequest;
import com.application.signora.dto.response.DefaultResponseEntity;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.entity.Staff;
import com.application.signora.entity.Student;
import com.application.signora.entity.User;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.StaffRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.repository.UserRepository;
import com.application.signora.service.UserService;
import com.application.signora.utility.UserServiceUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.security.autoconfigure.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    StaffRepository staffRepository;

    @Transactional
    public RegisterUserResponse registerUser(RegisterUserRequest request) {
        if(!userServiceUtil.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Kindly provide the valid username");
        }
        if(userServiceUtil.isStaff(request.getRole())) {
            if(!userServiceUtil.existsByEmpId(request.getIdentifier()))
                throw new RuntimeException("Kindly provide the valid staff's employee id");
            User savedUser = userRepository.save(User.builder().role(UserType.STAFF.toString())
                    .username(request.getUsername())
                    .password(encoder.encode(request.getPassword()))
                    .build());
            Staff registeredStaff = staffRepository.findByEmpId(request.getIdentifier()).get();
            registeredStaff.setRegisteredUserId(savedUser.getId());
        } else {
            if(!userServiceUtil.existsByRollNo(request.getIdentifier()))
                throw new RuntimeException("Kindly provide the valid student roll number");
            User savedUser = userRepository.save(
                    User.builder().role(UserType.STUDENT.toString())
                            .username(request.getUsername())
                            .password(request.getPassword())
                            .build()
            );
            Student registeredStudent = studentRepository.findByRollNo(request.getIdentifier()).get();
            registeredStudent.setRegisteredUserId(savedUser.getId());
        }
        return RegisterUserResponse.builder().message("User has been successfully registered").status(HttpStatus.OK).build();
    }

}

