package com.application.signora.dto.response.requestforms;


import com.application.signora.entity.enums.RequestStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestFormInfo {

    private Long id;

    private String requestBody;

    private String requestTitle;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

}
