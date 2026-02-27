package com.application.signora.controller;

import com.application.signora.dto.request.staff.CreateAuthorityRequest;
import com.application.signora.dto.request.staff.UpdateStatusRequest;
import com.application.signora.dto.response.authority.AuthorityDetailsResponse;
import com.application.signora.dto.response.authority.UpdateStatusResponse;
import com.application.signora.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class AuthorityController {

    @Autowired
    AuthorityService authorityService;

    @PostMapping("/form/update-status")
    public UpdateStatusResponse updateStatus(@RequestBody UpdateStatusRequest updateStatusRequest) {
        return authorityService.updateRequestStatus(updateStatusRequest);
    }

    @PostMapping("/admin/authority")
    public AuthorityDetailsResponse createAuthorityRequest(@RequestBody CreateAuthorityRequest createAuthorityRequest) {
        return authorityService.createAuthority(createAuthorityRequest);
    }

    @GetMapping("/admin/authority/{authorityId}")
    public AuthorityDetailsResponse getAuthorityRequest(@PathVariable Long authorityId) {
        return authorityService.getAuthority(authorityId);
    }

}
