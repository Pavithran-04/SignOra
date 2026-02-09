package com.application.signora.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class VerificationController {

    @PostMapping("/welcome")
    public String printWelcomeMessage() {
        return "Welcome to SignOra!!";
    }
}
