package com.application.signora.serviceimpl;

import com.application.signora.dto.request.department.CreateDepartmentRequest;
import com.application.signora.entity.Department;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public void createDepartment(CreateDepartmentRequest createDepartmentRequest) {

        if(departmentRepository.existsByName(createDepartmentRequest.getName())) {
            throw new RuntimeException("Department is invalid");
        }

        departmentRepository.save(
                Department.builder().name(createDepartmentRequest.getName()).build()
        );
    }
}
