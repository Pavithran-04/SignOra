package com.application.signora.utility;

import com.application.signora.dto.response.requestforms.RequestFormInfo;
import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.entity.BatchDetails;
import com.application.signora.entity.CertificateInfo;
import com.application.signora.entity.RequestDetails;
import com.application.signora.repository.CertificateInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.text.View;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FormServiceUtil {

    @Autowired
    CertificateInfoRepository certificateInfoRepository;

    public ViewFormsResponse convertFormsToResponse(List<RequestDetails> requestDetailsList) {
        List<RequestFormInfo> forms = requestDetailsList.stream()
                .map(requestDetails -> {
                    return RequestFormInfo.builder()
                            .id(requestDetails.getId())
                            .requestBody(requestDetails.getRequestBody())
                            .requestTitle(requestDetails.getRequestTitle())
                            .status(requestDetails.getStatus())
                            .requiredHodApproval(requestDetails.getApprovalInfo().getNeedHodSign())
                            .requirePrincipalApproval(requestDetails.getApprovalInfo().getNeedPrincipalSign())
                            .certificateLink(getCertificateLink(requestDetails))
                            .build();
                }).toList();
        return ViewFormsResponse.builder()
                .requestForms(forms)
                .totalForms(forms.size())
                .build();
    }

    public String getCertificateLink(RequestDetails requestDetails) {
        Optional<CertificateInfo> certificate =
                certificateInfoRepository.findByRequestDetails(requestDetails);
        return certificate.map(CertificateInfo::getLink).orElse(null);
    }
}
