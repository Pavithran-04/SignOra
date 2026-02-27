package com.application.signora.dto.request.staff;

import lombok.Data;

@Data
public class UpdateStatusRequest {

    private Long requestId;
    private Boolean isApproved;
}
