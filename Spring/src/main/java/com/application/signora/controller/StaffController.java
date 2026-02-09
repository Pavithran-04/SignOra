package com.application.signora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.dto.request.staff.CreateStaffRequest;
import com.application.signora.service.StaffService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class StaffController {

    @Autowired
    StaffService staffService;

    @PostMapping("/admin/staff")
    public void createStaff(CreateStaffRequest createStaffRequest) {
        staffService.createStaff(createStaffRequest);
    }

}
