package com.application.signora.utility;

import com.application.signora.config.CustomUserDetails;
import com.application.signora.dto.request.LoginUserRequest;
import com.application.signora.entity.Admin;
import com.application.signora.entity.User;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.AdminRepository;
import com.application.signora.repository.AuthorityRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserServiceUtil {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AdminRepository adminRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmpId(String empId) {
        return authorityRepository.findByEmpId(empId).isPresent();
    }

    public Boolean existsByRollNo(String rollNo) {
        return studentRepository.findByRollNo(rollNo).isPresent();
    }

    public Boolean isStaff(String role) {
        return role.equalsIgnoreCase(UserType.FACULTY.toString()) || role.equalsIgnoreCase(UserType.PRINCIPAL.toString())
                || role.equalsIgnoreCase(UserType.HOD.toString());
    }

    public Boolean isStudent(String role) {
        return role.equalsIgnoreCase(UserType.STUDENT.toString());
    }

    public boolean isAuthenticatedUser(LoginUserRequest loginUserRequest) {
        return userRepository.existsByUsernameAndPassword(loginUserRequest.getUsername(), loginUserRequest.getPassword());
    }

    public User getCurrentLoggedUser() {
        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(user.getUsername()).get();
    }

    public Admin getAdminByRegisteredUserId(Long registeredUserId) {
        return adminRepository.findByRegisteredUserId(registeredUserId);
    }
}
