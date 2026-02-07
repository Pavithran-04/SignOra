package com.application.signora.serviceimpl;

import com.application.signora.dto.request.staff.CreateStaffRequest;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.repository.StaffRepository;
import com.application.signora.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    StaffRepository staffRepository;

    @Override
    public void createStaff(CreateStaffRequest createStaffRequest) {
//        Department department = departmentRepository.findByName(createStaffRequest.getDepartmentName())
//                .orElseThrow(() -> new RuntimeException("Kindly enter the valid department name"));
//
//        if(staffRepository.existsByEmpId(createStaffRequest.getEmployeeId())) {
//            throw new RuntimeException("Employee id is already exists");
//        }
//
//        staffRepository.save(
//                Staff.builder()
//                        .empId(createStaffRequest.getEmployeeId())
//                        .department(department)
//                        .name(createStaffRequest.getName())
//                        .isHod(createStaffRequest.getIsHod())
//                        .isFaculty(createStaffRequest.getIsFaculty())
//                        .isPrincipal(createStaffRequest.getIsPrincipal())
//                        .build()
//        );
    }

}
