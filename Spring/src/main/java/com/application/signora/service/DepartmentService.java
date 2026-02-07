package com.application.signora.service;

import com.application.signora.dto.request.department.CreateDepartmentRequest;
import org.springframework.stereotype.Service;

@Service
public interface DepartmentService {

    public void createDepartment(CreateDepartmentRequest createDepartmentRequest);
}
