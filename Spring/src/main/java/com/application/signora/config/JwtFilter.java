package com.application.signora.config;

import com.application.signora.utility.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        System.out.println("\n\n\nENTERING INTO THE JWT FILTER\n\n\n");
        System.out.println("\n\n\nPRINTING THE AUTHHEADER: " + authHeader + "\n\n\n");

        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            System.out.println("\n\n\nUPDATING THE TOKEN AND USERNAME\n\n\n");
            token = authHeader.substring(7);
            username = jwtUtil.extractUsername(token);

        }

        System.out.println("\n\n\nPRINTING TOKEN: "+ token + "\n\n\n");

        System.out.println("\n\n\nPRINTING USERNAME:  " + username + "\n\n\n");

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.isTokenValid(token, userDetails.getUsername())) {
                System.out.println("\n\n\nTOKEN HAS BEEN VALID PROPERLY\n\n\n");
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("\n\n\nAUTHENTICATED USER HAS BEEN STORED\n\n\n");
            }

        }

        System.out.println("\n\n\nPROCESSING THE NEXT FILTER\n\n\n");
        filterChain.doFilter(request, response);
    }
}


