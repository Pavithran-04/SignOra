package com.application.signora.serviceimpl;

import com.application.signora.config.CustomUserDetails;
import com.application.signora.dto.request.college.CreateCollegeRequest;
import com.application.signora.dto.response.college.CollegeInfo;
import com.application.signora.dto.response.college.CreateCollegeResponse;
import com.application.signora.dto.response.college.GetCollegeResponse;
import com.application.signora.entity.Admin;
import com.application.signora.entity.College;
import com.application.signora.entity.User;
import com.application.signora.repository.CollegeRepository;
import com.application.signora.service.CollegeService;
import com.application.signora.utility.UserServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollegeServiceImpl implements CollegeService {

    @Autowired
    CollegeRepository collegeRepository;

    @Autowired
    UserServiceUtil userServiceUtil;

    @Override
    public CreateCollegeResponse createCollege(CreateCollegeRequest createCollegeRequest) {

        User user = userServiceUtil.getCurrentLoggedUser();
        Admin admin = userServiceUtil.getAdminByRegisteredUserId(user.getId());

        if(collegeRepository.existsByCode(createCollegeRequest.getCode())) {
            throw new RuntimeException("Kindly enter the different code");
        }

        College savedCollege = collegeRepository.save(
                College.builder()
                        .name(createCollegeRequest.getName())
                        .address(createCollegeRequest.getAddress())
                        .code(createCollegeRequest.getCode())
                        .admin(admin)
                        .build()
        );

        return CreateCollegeResponse.builder()
                .id(savedCollege.getId())
                .name(savedCollege.getName())
                .address(savedCollege.getAddress())
                .build();
    }

    public GetCollegeResponse getColleges() {
        User user = userServiceUtil.getCurrentLoggedUser();
        Admin admin = userServiceUtil.getAdminByRegisteredUserId(user.getId());

        List<CollegeInfo> collegeInfoList = collegeRepository.findAllByAdminId(admin.getId()).stream()
                .map(college -> CollegeInfo.builder()
                            .id(college.getId())
                            .name(college.getName())
                            .address(college.getAddress())
                            .code(college.getCode())
                            .build()
                ).toList();

        if(collegeInfoList.isEmpty())
            throw new RuntimeException("There is no colleges under this admin");

        return GetCollegeResponse.builder().collegeInfoList(collegeInfoList).build();
    }
}
