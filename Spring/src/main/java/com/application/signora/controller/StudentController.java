package com.application.signora.controller;

import com.application.signora.dto.response.student.CreateStudentResponse;
import com.application.signora.dto.response.student.StudentResponse;
import com.application.signora.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public CreateStudentResponse createStudent(@RequestBody CreateStudentRequest createStudentRequest) {
        return studentService.createStudent(createStudentRequest);
    }

    @PostMapping("/request")
    public FormResponse createFormRequest(@RequestBody FormRequest formRequest) {
        return studentService.raiseRequest(formRequest);
    }

    @GetMapping("/admin/students/{studentId}")
    public StudentResponse getStudent(@PathVariable Long studentId) {
        return studentService.getStudentById(studentId);
    }

}
