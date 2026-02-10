package com.application.signora.service;

import com.application.signora.dto.request.department.CreateDepartmentRequest;
import com.application.signora.dto.response.department.CreateDepartmentResponse;
import com.application.signora.dto.response.department.GetDepartmentsByCollegeResponse;
import org.springframework.stereotype.Service;

@Service
public interface DepartmentService {

    public CreateDepartmentResponse createDepartment(CreateDepartmentRequest createDepartmentRequest);

    GetDepartmentsByCollegeResponse getDepartmentByColleges(Long collgeId);
}
