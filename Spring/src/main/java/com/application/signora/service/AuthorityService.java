package com.application.signora.service;

import com.application.signora.dto.request.RegisterAuthorityRequest;
import com.application.signora.dto.request.staff.CreateAuthorityRequest;
import com.application.signora.dto.request.staff.UpdateStatusRequest;
import com.application.signora.dto.response.authority.AuthorityDetailsResponse;
import com.application.signora.dto.response.authority.UpdateStatusResponse;
import com.application.signora.dto.response.user.RegisterUserResponse;

public interface AuthorityService {

    UpdateStatusResponse updateRequestStatus(UpdateStatusRequest request);

    AuthorityDetailsResponse createAuthority(CreateAuthorityRequest request);

    AuthorityDetailsResponse getAuthority(Long authorityId);

    RegisterUserResponse registerUser(RegisterAuthorityRequest request);
}
