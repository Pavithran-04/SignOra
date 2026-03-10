package com.application.signora.dto.request.student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UploadCertificateRequest {

    private Long requestId;

    private String link;

}
