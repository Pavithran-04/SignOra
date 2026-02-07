package com.application.signora.controller;

import com.application.signora.service.DepartmentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class DepartmentController {

//    @Autowired
    DepartmentService departmentService;
//
//    @PostMapping("/department")
//    public void createDepartment(CreateDepartmentRequest createDepartmentRequest) {
//        departmentService.createDepartment(createDepartmentRequest);
//    }
}
