package com.application.signora.dto.response.requestforms;


import com.application.signora.entity.enums.RequestStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestFormInfo {

    private Long id;

    private String requestBody;

    private String requestTitle;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private Boolean requiredHodApproval;

    private Boolean requirePrincipalApproval;

    private String certificateLink;

}
