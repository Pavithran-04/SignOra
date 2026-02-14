package com.application.signora.serviceimpl;

import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.CreateStudentResponse;
import com.application.signora.dto.response.student.FormResponse;
import com.application.signora.entity.*;
import com.application.signora.entity.enums.RequestStatus;
import com.application.signora.entity.enums.UserType;
import com.application.signora.repository.*;
import com.application.signora.service.StudentService;
import com.application.signora.utility.StudentServiceUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    BatchDetailsRepository batchDetailsRepository;

    @Autowired
    CollegeRepository collegeRepository;

    @Override
    @Transactional
    public CreateStudentResponse createStudent(CreateStudentRequest request) {
        if (studentRepository.existsByRollNo(request.getRollNo())) {
            throw new RuntimeException("Roll number already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User savedUser = userRepository.save(User.builder()
                .username(request.getUsername())
                .password(encoder.encode(request.getPassword()))
                .role(UserType.STUDENT.toString())
                .build());

        BatchDetails batchDetails = batchDetailsRepository.findById(request.getBatchId()).get();
        Department department = departmentRepository.findById(batchDetails.getDepartment().getId()).get();
        College college = collegeRepository.findById(department.getCollege().getId()).get();

        Student savedStudent = studentRepository.save(Student.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .rollNo(request.getRollNo())
                .batchDetails(batchDetails)
                .user(savedUser)
                .build());

        return CreateStudentResponse.builder()
                .id(savedStudent.getId())
                .firstName(savedStudent.getFirstName())
                .lastName(savedStudent.getLastName())
                .rollNo(savedStudent.getRollNo())
                .username(savedUser.getUsername())
                .collegeId(college.getId())
                .departmentId(department.getId())
                .batchId(batchDetails.getId())
                .build();
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
