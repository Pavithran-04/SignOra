package com.application.signora.serviceimpl;

import com.application.signora.dto.response.requestforms.RequestFormInfo;
import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.entity.Authority;
import com.application.signora.entity.BatchDetails;
import com.application.signora.entity.RequestDetails;
import com.application.signora.entity.Student;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.AuthorityRepository;
import com.application.signora.repository.BatchDetailsRepository;
import com.application.signora.repository.RequestDetailsRepository;
import com.application.signora.repository.StudentRepository;
import com.application.signora.service.FormService;
import com.application.signora.utility.FormServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.engine.jdbc.batch.spi.Batch;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.View;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Slf4j
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

    @Autowired
    BatchDetailsRepository batchDetailsRepository;

    @Override
    public ViewFormsResponse viewForms(String role, Long identifier) {

        if (role.equalsIgnoreCase(UserType.STUDENT.toString())) {
            return getFormsByStudent(identifier);
        } else if (role.equalsIgnoreCase(UserType.FACULTY.toString())) {
            return getFormsByFaculty(identifier);
        } else if (role.equalsIgnoreCase(UserType.HOD.toString())) {
            return getFormsByHod(identifier);
        } else if (role.equalsIgnoreCase(UserType.PRINCIPAL.toString())) {
            return null;
        } else {
            throw new RuntimeException("Invalid role");
        }

    }

    @Override
    public RequestFormInfo getForm(Long formId) {
        RequestDetails requestDetails = requestDetailsRepository.findById(formId).orElseThrow(() -> new RuntimeException("Invalid form id"));
        return RequestFormInfo.builder().id(requestDetails.getId()).requestTitle(requestDetails.getRequestTitle()).requestBody(requestDetails.getRequestBody()).status(requestDetails.getStatus()).build();
    }

    private ViewFormsResponse getFormsByStudent(Long identifier) {
        Student student = studentRepository.findByUserId(identifier).orElseThrow(() -> new RuntimeException("Student not found"));
        List<RequestDetails> requestForms = requestDetailsRepository.findByStudentId(student.getId());
        if (requestForms.isEmpty()) {
            return ViewFormsResponse.builder().requestForms(List.of()).totalForms(0).build();
        }
        return formServiceUtil.convertFormsToResponse(requestForms);
    }

    private ViewFormsResponse getFormsByFaculty(Long identifier) {
        Authority authority = authorityRepository.findByUser_Id(identifier).orElseThrow(() -> new RuntimeException("Faculty not found"));
        List<RequestDetails> requestForms = getFormsByBatchDetails(batchDetailsRepository.findByFacultyId(authority.getId()));
        return formServiceUtil.convertFormsToResponse(requestForms);
    }

    private ViewFormsResponse getFormsByHod(Long identifier) {
        Authority authority = authorityRepository.findByUser_Id(identifier).orElseThrow(() -> new RuntimeException("Hod not found"));

        List<RequestDetails> requestDetails = batchDetailsRepository.findAllByDepartmentId(authority.getDepartment().getId()).stream().map(batch -> getFormsByBatchDetails(Optional.ofNullable(batch))).flatMap(List::stream).toList();

        return formServiceUtil.convertFormsToResponse(requestDetails);
    }

    private List<RequestDetails> getFormsByBatchDetails(Optional<BatchDetails> batchDetails) {
        return batchDetails.map(details -> studentRepository.findByBatchId(details.getId()).stream()
                .map(student -> requestDetailsRepository.findByStudentId(student.getId()))
                .flatMap(List::stream)
                .collect(Collectors.toList())).orElseGet(List::of);

    }
}
