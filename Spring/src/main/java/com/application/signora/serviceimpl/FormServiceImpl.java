package com.application.signora.serviceimpl;

import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.entity.Authority;
import com.application.signora.entity.RequestDetails;
import com.application.signora.entity.Student;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.AuthorityRepository;
import com.application.signora.repository.RequestDetailsRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.service.FormService;
import com.application.signora.utility.FormServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormServiceImpl implements FormService {

    @Autowired
    RequestDetailsRepository requestDetailsRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    FormServiceUtil formServiceUtil;

    @Override
    public ViewFormsResponse viewForms(String role, Long identifier) {

        if(role.equalsIgnoreCase(UserType.STUDENT.toString())) {
            return getFormsByStudent(identifier);
        } else if (role.equalsIgnoreCase(UserType.STAFF.toString())) {
            return null;
        } else if (role.equalsIgnoreCase(UserType.PRINCIPAL.toString())) {
            return null;
        }

        return null;
    }

    public ViewFormsResponse getFormsByStudent(Long identifier) {
        Student student = studentRepository.findByUserId(identifier).get();
        List<RequestDetails> requestForms = requestDetailsRepository.findByStudentId(student.getId());
        System.out.println(requestForms.size());
        return formServiceUtil.convertFormsToResponse(requestForms);
    }

    public ViewFormsResponse getFormsByAuthority(Long identifier) {
//        CollegeAuthority collegeAuthority = authorityRepository.findByUserId(identifier).get();
        return null;
    }

}
