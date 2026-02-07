package com.application.signora.service;

import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.FormResponse;

import java.net.CacheRequest;

public interface StudentService {

    void createStudent(CreateStudentRequest createStudentRequest);

    FormResponse raiseRequest(FormRequest formRequest);

    void viewForms(String role, String status);
}
