package com.application.signora.serviceimpl;

import com.application.signora.dto.request.department.CreateDepartmentRequest;
import com.application.signora.dto.response.department.CreateDepartmentResponse;
import com.application.signora.dto.response.department.DepartmentInfo;
import com.application.signora.dto.response.department.GetDepartmentsByCollegeResponse;
import com.application.signora.entity.College;
import com.application.signora.entity.Department;
import com.application.signora.repository.CollegeRepository;
import com.application.signora.repository.DepartmentRepository;
import com.application.signora.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    CollegeRepository collegeRepository;

    @Override
    public CreateDepartmentResponse createDepartment(CreateDepartmentRequest createDepartmentRequest) {

        List<Department> departmentList = departmentRepository.findAllByCollegeId(createDepartmentRequest.getCollegeId());

        if (!departmentList.isEmpty() &&
                departmentList.stream().anyMatch(department -> department.getName().equals(createDepartmentRequest.getName()))) {
            throw new RuntimeException("Duplicate department for this college");
        }

        Department savedDepartment = departmentRepository.save(
                Department.builder().name(createDepartmentRequest.getName())
                        .college(collegeRepository.findById(createDepartmentRequest.getCollegeId()).get())
                        .build()
        );

        return CreateDepartmentResponse.builder()
                .id(savedDepartment.getId())
                .name(savedDepartment.getName())
                .collegeId(savedDepartment.getCollege().getId())
                .build();
    }

    @Override
    public GetDepartmentsByCollegeResponse getDepartmentByColleges(Long collegeId) {
        List<Department> departmentList = departmentRepository.findAllByCollegeId(collegeId);

        List<DepartmentInfo> departmentInfos = departmentList.stream()
                .map(department -> DepartmentInfo.builder()
                        .id(department.getId())
                        .name(department.getName())
                        .build()
                ).toList();

        return GetDepartmentsByCollegeResponse.builder()
                .departments(departmentInfos)
                .status(HttpStatus.OK)
                .build();

    }
}
