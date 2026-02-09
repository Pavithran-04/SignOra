package com.application.signora.serviceimpl;

import com.application.signora.dto.request.staff.CreateStaffRequest;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.repository.CollegeAuthorityRepository;
import com.application.signora.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    CollegeAuthorityRepository collegeAuthorityRepository;

    @Override
    public void createStaff(CreateStaffRequest createStaffRequest) {

    }

}
