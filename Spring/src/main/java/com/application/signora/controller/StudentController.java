package com.application.signora.controller;

import com.application.signora.dto.request.student.CreateStudentRequest;
import com.application.signora.dto.request.student.FormRequest;
import com.application.signora.dto.response.student.FormResponse;
import com.application.signora.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
