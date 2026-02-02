package com.application.signora.utility;

import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.StaffRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserServiceUtil {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StaffRepository staffRepository;

    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public Boolean existsByEmpId(String empId) {
        return staffRepository.findByEmpId(empId).isPresent();
    }

    public Boolean existsByRollNo(String rollNo) {
        return studentRepository.findByRollNo(rollNo).isPresent();
    }

    public Boolean isStaff(String role) {
        return role.equals(UserType.STAFF.toString());
    }

    public Boolean isStudent(String role) {
        return role.equals(UserType.STUDENT.toString());
    }


}
