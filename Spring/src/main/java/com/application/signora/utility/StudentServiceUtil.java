package com.application.signora.utility;

import com.application.signora.config.CustomUserDetails;
import com.application.signora.entity.RequestDetails;
import com.application.signora.entity.Student;
import com.application.signora.entity.User;
import com.application.signora.repository.StudentRepository;
import com.application.signora.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class StudentServiceUtil {

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudentRepository studentRepository;

    public boolean hasValidStartAndEndYear(Integer startYear, Integer endYear) {
        return (startYear < endYear) && (endYear - startYear == 3 || endYear - startYear == 4);
    }

    public void convertViewFormDTO(RequestDetails requestDetails) {
    }

//    public Student getCurrentLoggedUser() {
//        CustomUserDetails user = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        User loggedUserDetails = userRepository.findByUsername(user.getUsername()).get();
//        return studentRepository.findByUserId(loggedUserDetails.getId()).get();
//    }
}
