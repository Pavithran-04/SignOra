package com.application.signora.controller;

import com.application.signora.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FormController {

    @Autowired
    StudentService studentService;

    @PostMapping("/forms")
    public void viewForms(@RequestParam String role, @RequestParam String status) {
        studentService.viewForms(role, status);
    }

}
