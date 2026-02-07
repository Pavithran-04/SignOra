package com.application.signora.service;

import com.application.signora.dto.response.user.GetAccessTokenResponse;
import com.application.signora.dto.response.user.LoginResponse;
import com.application.signora.utility.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public GetAccessTokenResponse getAccessToken(String username, String password) {
        System.out.println("\n\n\nPROCESS LOGIN SERVICE\n\n\n");
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(username, password);
        System.out.println("AUTHENTICATION OBJECT: " + authentication.toString());

        Authentication authResult = authenticationManager.authenticate(authentication);

        try {
            System.out.println("AUTH RESULT OBJECT: " + authResult.getPrincipal().toString());
            return GetAccessTokenResponse.builder().status(HttpStatus.ACCEPTED).token(jwtUtil.generateToken(authResult.getName())).build();
        } catch (Exception e) {
            System.out.println("GETTING EXCEPTION IN LOGIN METHOD");
        }
        return null;
    }
}

