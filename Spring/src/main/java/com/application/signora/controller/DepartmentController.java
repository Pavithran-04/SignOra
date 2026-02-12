package com.application.signora.controller;


import com.application.signora.dto.request.department.CreateDepartmentRequest;
import com.application.signora.dto.response.department.CreateDepartmentResponse;
import com.application.signora.dto.response.department.GetDepartmentsByCollegeResponse;
import com.application.signora.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.application.signora.service.DepartmentService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

    @Autowired
    DepartmentService departmentService;

    @PostMapping("/department")
    public CreateDepartmentResponse createDepartment(@RequestBody CreateDepartmentRequest createDepartmentRequest) {
        return departmentService.createDepartment(createDepartmentRequest);
    }

    @GetMapping("/departments")
    public GetDepartmentsByCollegeResponse getDepartmentsByColleges(@RequestParam Long collegeId) {
        return departmentService.getDepartmentByColleges(collegeId);
    }

}
