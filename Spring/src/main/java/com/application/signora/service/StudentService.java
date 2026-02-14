package com.application.signora.service;

import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.CreateStudentResponse;
import com.application.signora.dto.response.student.FormResponse;

public interface StudentService {

    CreateStudentResponse createStudent(CreateStudentRequest createStudentRequest);

    FormResponse raiseRequest(FormRequest formRequest);

    void viewForms(String role, String status);
}
