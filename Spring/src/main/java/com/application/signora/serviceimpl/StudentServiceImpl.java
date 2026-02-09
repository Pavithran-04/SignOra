package com.application.signora.serviceimpl;

import com.application.signora.config.CustomUserDetails;
import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.FormResponse;
import com.application.signora.entity.ApprovalInfo;
import com.application.signora.entity.CertificateInfo;
import com.application.signora.entity.RequestDetails;
import com.application.signora.entity.enums.RequestStatus;
import com.application.signora.repository.*;
import com.application.signora.service.StudentService;
import com.application.signora.utility.StudentServiceUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    StudentServiceUtil studentServiceUtil;

    @Autowired
    RequestDetailsRepository requestDetailsRepository;

    @Autowired
    ApprovalInfoRepository approvalInfoRepository;

    @Autowired
    CertificateInfoRepository certificateInfoRepository;

    @Override
    @Transactional
    public void createStudent(CreateStudentRequest request) {

    }

    @Override
    @Transactional
    public FormResponse raiseRequest(FormRequest formRequest) {
        ApprovalInfo approvalInfo = ApprovalInfo.builder()
                .needHodSign(formRequest.getIsHodApprovalRequired())
                .needPrincipalSign(formRequest.getIsPrincipalApprovalRequired())
                .build();

        CertificateInfo certificateInfo = CertificateInfo.builder().build();

        RequestDetails requestDetails = RequestDetails.builder()
                .requestTitle(formRequest.getRequestTitle())
                .requestBody(formRequest.getRequestBody())
                .approvalInfo(approvalInfo)
                .certificateInfo(certificateInfo)
//                .student(studentServiceUtil.getCurrentLoggedUser())
                .status(RequestStatus.MOVED_TO_FACULTY)
                .build();

        approvalInfo.setRequestDetails(requestDetails);
        certificateInfo.setRequestDetails(requestDetails);

        requestDetailsRepository.save(requestDetails);

        return FormResponse.builder().message("Application has been successfully raised").status(HttpStatus.OK).build();
    }

    @Override
    public void viewForms(String role, String status) {

    }

}
