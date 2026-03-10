package com.application.signora.serviceimpl;

import com.application.signora.dto.response.requestforms.RequestFormInfo;
import com.application.signora.dto.response.projections.RequestFormInfoProjection;
import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.entity.*;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.*;
import com.application.signora.service.FormService;
import com.application.signora.utility.FormServiceUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.RequestInfo;
import org.hibernate.engine.jdbc.batch.spi.Batch;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.View;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
    CertificateInfoRepository certificateInfoRepository;

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
            return getFormsByPrincipal(identifier);
        } else {
            throw new RuntimeException("Invalid role");
        }

    }

    @Override
    public RequestFormInfo getForm(Long formId) {
        RequestDetails requestDetails = requestDetailsRepository.findById(formId).orElseThrow(() -> new RuntimeException("Invalid form id"));
        return RequestFormInfo.builder()
                .id(requestDetails.getId())
                .requestTitle(requestDetails.getRequestTitle())
                .requestBody(requestDetails.getRequestBody())
                .certificateLink(formServiceUtil.getCertificateLink(requestDetails))
                .requiredHodApproval(requestDetails.getApprovalInfo().getNeedHodSign())
                .requirePrincipalApproval(requestDetails.getApprovalInfo().getNeedPrincipalSign())
                .status(requestDetails.getStatus())
                .build();
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

        List<RequestFormInfo> requestForms = requestDetailsRepository
                .getFormsByFaculty(authority.getUser().getId())
                .stream()
                .map(p -> RequestFormInfo.builder()
                        .id(p.getId())
                        .requestBody(p.getRequestBody())
                        .requestTitle(p.getRequestTitle())
                        .status(p.getStatus())
                        .requiredHodApproval(p.getRequiredHodApproval())
                        .requirePrincipalApproval(p.getRequiredPrincipalApproval())
                        .certificateLink(p.getCertificateLink())
                        .build())
                .toList();

        return ViewFormsResponse.builder()
                .requestForms(requestForms)
                .totalForms(requestForms.size())
                .build();
    }

    private ViewFormsResponse getFormsByHod(Long identifier) {
        Authority authority = authorityRepository.findByUser_Id(identifier).orElseThrow(() -> new RuntimeException("Hod not found"));

        List<RequestFormInfo> requestForms = requestDetailsRepository
                .getFormsByHod(authority.getUser().getId())
                .stream()
                .map(p -> RequestFormInfo.builder()
                        .id(p.getId())
                        .requestBody(p.getRequestBody())
                        .requestTitle(p.getRequestTitle())
                        .requiredHodApproval(p.getRequiredHodApproval())
                        .requirePrincipalApproval(p.getRequiredPrincipalApproval())
                        .certificateLink(p.getCertificateLink())
                        .status(p.getStatus())
                        .build())
                .toList();

        return ViewFormsResponse.builder()
                .requestForms(requestForms)
                .totalForms(requestForms.size())
                .build();
    }

    private ViewFormsResponse getFormsByPrincipal(Long identifier) {
        Authority authority = authorityRepository.findByUser_Id(identifier).orElseThrow(() -> new RuntimeException("Principal not found"));

        List<RequestFormInfo> requestForms = requestDetailsRepository
                .getFormsByPrincipal(authority.getUser().getId())
                .stream()
                .map(p -> RequestFormInfo.builder()
                        .id(p.getId())
                        .requestBody(p.getRequestBody())
                        .requestTitle(p.getRequestTitle())
                        .requiredHodApproval(p.getRequiredHodApproval())
                        .requirePrincipalApproval(p.getRequiredPrincipalApproval())
                        .certificateLink(p.getCertificateLink())
                        .status(p.getStatus())
                        .build())
                .toList();

        return ViewFormsResponse.builder()
                .requestForms(requestForms)
                .totalForms(requestForms.size())
                .build();
    }
}
