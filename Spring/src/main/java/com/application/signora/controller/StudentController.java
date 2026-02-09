package com.application.signora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.FormResponse;
import com.application.signora.service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping("/admin/student")
    public void createStudent(@RequestBody CreateStudentRequest createStudentRequest) {
        studentService.createStudent(createStudentRequest);
    }

    @PostMapping("/request")
    public FormResponse createFormRequest(@RequestBody FormRequest formRequest) {
        return studentService.raiseRequest(formRequest);
    }


}
