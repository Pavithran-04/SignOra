package com.application.signora.controller;

import com.application.signora.dto.request.college.CreateCollegeRequest;
import com.application.signora.dto.response.college.CollegeInfo;
import com.application.signora.dto.response.college.CreateCollegeResponse;
import com.application.signora.dto.response.college.GetCollegeResponse;
import com.application.signora.entity.College;
import com.application.signora.service.CollegeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class CollegeController {

    @Autowired
    CollegeService collegeService;

    @PostMapping("/college")
    public CreateCollegeResponse createCollege(@RequestBody CreateCollegeRequest createCollegeRequest) {
        return collegeService.createCollege(createCollegeRequest);
    }

    @GetMapping("/colleges")
    public GetCollegeResponse getColleges() {
        return collegeService.getColleges();
    }
}
