package com.application.signora.utility;

import com.application.signora.dto.response.requestforms.RequestFormInfo;
import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.entity.BatchDetails;
import com.application.signora.entity.RequestDetails;
import org.springframework.stereotype.Component;

import javax.swing.text.View;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FormServiceUtil {

    public ViewFormsResponse convertFormsToResponse(List<RequestDetails> requestDetailsList) {
        List<RequestFormInfo> forms = requestDetailsList.stream()
                .map(requestDetails -> {
                    return RequestFormInfo.builder()
                            .id(requestDetails.getId())
                            .requestBody(requestDetails.getRequestBody())
                            .requestTitle(requestDetails.getRequestTitle())
                            .status(requestDetails.getStatus())
                            .build();
                }).toList();
        return ViewFormsResponse.builder()
                .requestForms(forms)
                .build();
    }
}
