package com.application.signora.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityImplementationObjectCreation(HttpSecurity securityPlan) throws Exception {

        securityPlan.csrf(AbstractHttpConfigurer::disable);

        securityPlan.authorizeHttpRequests(request -> request

                // Public endpoints
                .requestMatchers("/auth/token", "/user/register").permitAll()

                // USER specific
                .requestMatchers("/bill/pending-bills").hasRole("USER")

                // ADMIN specific
                .requestMatchers("/apartment/**").hasRole("ADMIN")
                .requestMatchers("/bill/**").hasRole("ADMIN")
                .requestMatchers("/block/**").hasRole("ADMIN")
                .requestMatchers("/dashboard/**").hasRole("ADMIN")
                .requestMatchers("/flat/**").hasRole("ADMIN")
                .requestMatchers("/floor/**").hasRole("ADMIN")
                .requestMatchers("/management/**").hasRole("ADMIN")
                .requestMatchers("/threads/**").hasRole("ADMIN")
                .requestMatchers("/admin/**").hasRole("ADMIN")

                // Shared access
                .requestMatchers("/payment/**", "/tenant/**")
                .hasAnyRole("USER", "ADMIN")

                // Everything else
                .anyRequest().authenticated()
        );

        securityPlan.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return securityPlan.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(customUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

}


