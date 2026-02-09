package com.application.signora.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.signora.service.StudentService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class FormController {

    @Autowired
    StudentService studentService;

    @PostMapping("/forms")
    public void viewForms(@RequestParam String role, @RequestParam String status) {
        studentService.viewForms(role, status);
    }

}
