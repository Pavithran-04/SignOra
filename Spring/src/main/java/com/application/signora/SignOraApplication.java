package com.application.signora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class SignOraApplication {

	public static void main(String[] args) {

        SpringApplication.run(SignOraApplication.class, args);

	}

}
