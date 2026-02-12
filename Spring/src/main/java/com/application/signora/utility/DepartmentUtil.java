package com.application.signora.utility;

import com.application.signora.entity.Department;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
@Component
public class DepartmentUtil {

    @Autowired
    DepartmentRepository departmentRepository;

    public Department getDeaprtment(Long departmentId) {
        return departmentRepository.findById(departmentId).get();
    }
}
