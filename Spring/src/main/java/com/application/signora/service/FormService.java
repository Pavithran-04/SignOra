package com.application.signora.service;

import com.application.signora.dto.response.student.ViewFormsResponse;

public interface FormService {

    public ViewFormsResponse viewForms(String role, Long identifier);

}
