package com.application.signora.dto.response.projections;

import com.application.signora.entity.enums.RequestStatus;

public interface RequestFormInfoProjection {

    Long getId();

    String getRequestBody();

    String getRequestTitle();

    RequestStatus getStatus();
}
