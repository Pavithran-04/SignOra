package com.application.signora.controller;

import com.application.signora.dto.response.student.ViewFormsResponse;
import com.application.signora.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.application.signora.service.StudentService;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FormController {

    @Autowired
    FormService formService;

    @GetMapping("/forms")
    public ViewFormsResponse viewForms(@RequestParam String role, @RequestParam Long identifier) {
        return formService.viewForms(role, identifier);
    }

}
