package com.application.signora.controller;

import com.application.signora.dto.request.staff.CreateStaffRequest;
import com.application.signora.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StaffController {

    @Autowired
    StaffService staffService;

    @PostMapping("/admin/staff")
    public void createStaff(CreateStaffRequest createStaffRequest) {
        staffService.createStaff(createStaffRequest);
    }

}
