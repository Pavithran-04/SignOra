package com.application.signora.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerificationController {

    @PostMapping("/welcome")
    public String printWelcomeMessage() {
        return "Welcome to SignOra!!";
    }
}
