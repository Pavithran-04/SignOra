package com.application.signora.service;

import com.application.signora.dto.request.college.CreateCollegeRequest;
import com.application.signora.dto.response.college.CollegeInfo;
import com.application.signora.dto.response.college.CreateCollegeResponse;
import com.application.signora.dto.response.college.GetCollegeResponse;
import com.application.signora.entity.College;

import java.util.List;

public interface CollegeService {

    CreateCollegeResponse createCollege(CreateCollegeRequest createCollegeRequest);
    GetCollegeResponse getColleges();
}
