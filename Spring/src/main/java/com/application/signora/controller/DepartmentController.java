package com.application.signora.controller;

<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.CrossOrigin;
=======
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.service.DepartmentService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")

public class DepartmentController {

//    @Autowired
//    DepartmentService departmentService;
//
//    @PostMapping("/department")
//    public void createDepartment(CreateDepartmentRequest createDepartmentRequest) {
//        departmentService.createDepartment(createDepartmentRequest);
//    }
}
