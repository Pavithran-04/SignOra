package com.application.signora.serviceimpl;

import com.application.signora.dto.request.RegisterAuthorityRequest;
import com.application.signora.dto.request.staff.CreateAuthorityRequest;
import com.application.signora.dto.request.staff.UpdateStatusRequest;
import com.application.signora.dto.response.authority.AuthorityDetailsResponse;
import com.application.signora.dto.response.authority.UpdateStatusResponse;
import com.application.signora.dto.response.batchdetails.BatchDetailsResponse;
import com.application.signora.dto.response.college.CollegeResponse;
import com.application.signora.dto.response.department.DepartmentResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;
import com.application.signora.entity.*;
import com.application.signora.entity.enums.RequestStatus;
import com.application.signora.repository.*;
import com.application.signora.service.AuthorityService;
import com.application.signora.utility.UserServiceUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.engine.jdbc.batch.spi.Batch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;


@Slf4j
@Service
public class AuthorityServiceImpl implements AuthorityService {

    @Autowired
    RequestDetailsRepository requestDetailsRepository;

    @Autowired
    ApprovalInfoRepository approvalInfoRepository;

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    BatchDetailsRepository batchDetailsRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    CollegeRepository collegeRepository;

    @Autowired
    UserServiceUtil userServiceUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    StudentRepository studentRepository;

    @Transactional
    public RegisterUserResponse registerUser(RegisterAuthorityRequest request) {
        if(userServiceUtil.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User savedUser = userRepository.save(
                User.builder()
                        .username(request.getUsername())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .build()
        );

        Authority staff = authorityRepository.findByEmpId(request.getIdentifier())
                .orElseThrow(() -> new RuntimeException("Invalid employee id"));
        if(!Objects.isNull(staff.getUser()))
            throw new RuntimeException(request.getIdentifier() + " already has been registered");
        savedUser.setRole(staff.getDesignation());

        staff.setUser(savedUser);
        authorityRepository.save(staff);

        return RegisterUserResponse.builder()
                .message("User has been successfully registered")
                .status(HttpStatus.OK)
                .build();
    }

    @Transactional
    public UpdateStatusResponse updateRequestStatus(UpdateStatusRequest request) {

        RequestDetails requestDetails = requestDetailsRepository.findById(request.getRequestId()).orElseThrow(() -> new RuntimeException("Invalid Request Id"));

        ApprovalInfo approvalInfo = approvalInfoRepository.findByRequestId(request.getRequestId()).orElseThrow(() -> new RuntimeException("Approval info not found"));

        RequestStatus currentStatus = requestDetails.getStatus();
        boolean isApproved = request.getIsApproved();

        switch (currentStatus) {

            case MOVED_TO_FACULTY:
                if (isApproved) {
                    if (approvalInfo.getNeedHodSign()) {
                        requestDetails.setStatus(RequestStatus.MOVED_TO_HOD);
                    } else {
                        requestDetails.setStatus(RequestStatus.APPROVED_BY_FACULTY);
                    }
                } else {
                    requestDetails.setStatus(RequestStatus.REJECTED_BY_FACULTY);
                }
                break;

            case MOVED_TO_HOD:
                if (isApproved) {

                    if (approvalInfo.getNeedPrincipalSign()) {
                        requestDetails.setStatus(RequestStatus.MOVED_TO_PRINCIPAL);
                    } else {
                        requestDetails.setStatus(RequestStatus.APPROVED_BY_HOD);
                    }

                } else {
                    requestDetails.setStatus(RequestStatus.REJECTED_BY_HOD);
                }
                break;

            case MOVED_TO_PRINCIPAL:
                if (isApproved) {
                    requestDetails.setStatus(RequestStatus.APPROVED_BY_PRINCIPAL);
                } else {
                    requestDetails.setStatus(RequestStatus.REJECTED_BY_PRINCIPAL);
                }
                break;

            default:
                throw new RuntimeException("Invalid status transition");
        }

        requestDetailsRepository.save(requestDetails);

        return UpdateStatusResponse.builder().message("Status has been updated").status(HttpStatus.ACCEPTED).build();
    }

    @Transactional
    public AuthorityDetailsResponse createAuthority(CreateAuthorityRequest request) {

        log.info("Creating authority with designation: {}, employeeId: {}",
                request.getDesignation(), request.getEmployeeId());

        if (authorityRepository.existsByEmpId(request.getEmployeeId())) {
            log.warn("Duplicate employeeId detected: {}", request.getEmployeeId());
            throw new RuntimeException("Employee ID already exists");
        }

        Authority authority = Authority.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .empId(request.getEmployeeId())
                .designation(request.getDesignation())
                .build();

        Department department = new Department();
        if(Objects.nonNull(request.getDepartmentId())) {
            department = departmentRepository.findById(request.getDepartmentId()).orElseThrow(
                    () -> {
                        log.error("Department not found with id: {}", request.getDepartmentId());
                        return new RuntimeException("Department not found");
                    });
            authority.setDepartment(department);
        }

        College college = new College();
        if(Objects.nonNull(request.getCollegeId())) {
            college = collegeRepository.findById(request.getCollegeId())
                    .orElseThrow(() -> {
                        log.error("College not found with id: {}", request.getCollegeId());
                        return new RuntimeException("College not found");
                    });
        }

        authority = authorityRepository.save(authority);
        log.info("Authority created successfully with id: {}", authority.getId());

        handleDesignationLogic(request, authority, department, college);

        log.info("Completed designation handling for authority id: {}", authority.getId());

        AuthorityDetailsResponse response = AuthorityDetailsResponse.builder()
                .id(authority.getId())
                .fullName(authority.getFirstName() + " " + authority.getLastName())
                .employeeId(authority.getEmpId())
                .designation(authority.getDesignation())
                .college(
                        CollegeResponse.builder()
                                .id(college.getId())
                                .name(college.getName())
                                .build()
                )
                .department(
                        DepartmentResponse.builder()
                                .id(department.getId())
                                .name(department.getName())
                                .build()
                )
                .build();
        Optional<BatchDetails> assignedBatch = batchDetailsRepository
                .findByFacultyId(authority.getId());
        assignedBatch.ifPresent(batchDetails -> response.setBatch(BatchDetailsResponse.builder()
                .id(batchDetails.getId())
                .startYear(batchDetails.getStartYear())
                .endYear(batchDetails.getEndYear())
                .build()));

        return response;
    }

    @Override
    public AuthorityDetailsResponse getAuthority(Long authorityId) {

        log.info("Get Authority Block has been started");

        Authority authority = authorityRepository.findById(authorityId)
                .orElseThrow(() -> new RuntimeException("Invalid authority id"));

        College college = collegeRepository.findById(authority.getDepartment().getCollege().getId()).get();

        Department department = authority.getDepartment();

        AuthorityDetailsResponse response = AuthorityDetailsResponse.builder()
                .id(authority.getId())
                .fullName(authority.getFirstName() + " " + authority.getLastName())
                .employeeId(authority.getEmpId())
                .designation(authority.getDesignation())
                .college(
                        CollegeResponse.builder()
                                .id(college.getId())
                                .name(college.getName())
                                .build()
                )
                .department(
                        DepartmentResponse.builder()
                                .id(department.getId())
                                .name(department.getName())
                                .build()
                )
                .build();
        Optional<BatchDetails> assignedBatch = batchDetailsRepository
                .findByFacultyId(authority.getId());
        assignedBatch.ifPresent(batchDetails -> response.setBatch(BatchDetailsResponse.builder()
                .id(batchDetails.getId())
                .startYear(batchDetails.getStartYear())
                .endYear(batchDetails.getEndYear())
                .build()));

        return response;
    }

    private void handleDesignationLogic(CreateAuthorityRequest request, Authority authority, Department department, College college) {

        switch (request.getDesignation()) {
            case "FACULTY":
                handleFaculty(request, authority);
                break;
            case "HOD":
                handleHod(request, authority, department);
                break;
            case "PRINCIPAL":
                handlePrincipal(request, authority, department, college);
                break;
            default:
                throw new RuntimeException("Invalid Designation");
        }

    }

    private void handleFaculty(CreateAuthorityRequest request, Authority authority) {
        assignBatchIfNotAssigned(request.getBatchId(), authority);
    }

    private void handleHod(CreateAuthorityRequest request, Authority authority, Department department) {
        if(Objects.isNull(department.getHod())) {
            department.setHod(authority);
            departmentRepository.save(department);
            assignBatchIfNotAssigned(request.getBatchId(), authority);
        } else {
            throw new RuntimeException("This department is already assigned to some other HOD");
        }
    }

    private void handlePrincipal(CreateAuthorityRequest request, Authority authority, Department department, College college) {

        if(Objects.isNull(college.getPrincipal())) {
            college.setPrincipal(authority);
            collegeRepository.save(college);
        } else {
            throw new RuntimeException("This college is already assigned to some other Principal");
        }

        if (Objects.nonNull(request.getDepartmentId())) {
            if(Objects.isNull(department.getHod())) {
                department.setHod(authority);
                departmentRepository.save(department);
                assignBatchIfNotAssigned(request.getBatchId(), authority);
            } else {
                throw new RuntimeException("This batch is already assigned to some other faculty");
            }
        }
    }

    private void assignBatchIfNotAssigned(Long batchId, Authority authority) {
        if(Objects.nonNull(batchId)) {
            BatchDetails batchDetails = batchDetailsRepository.findById(batchId).get();
            if(Objects.isNull(batchDetails.getFaculty())) {
                batchDetails.setFaculty(authority);
                batchDetailsRepository.save(batchDetails);
            } else {
                throw new RuntimeException("This batch is already assigned to some other faculty");
            }
        }
    }
}
