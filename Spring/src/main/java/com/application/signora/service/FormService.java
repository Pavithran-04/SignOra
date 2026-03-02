package com.application.signora.service;

import com.application.signora.dto.response.requestforms.RequestFormInfo;
import com.application.signora.dto.response.student.ViewFormsResponse;

public interface FormService {

    ViewFormsResponse viewForms(String role, Long identifier);

    RequestFormInfo getForm(Long formId);
}
