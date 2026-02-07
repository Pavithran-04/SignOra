package com.application.signora.dto.response.user;

import com.application.signora.dto.response.DefaultResponseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse extends DefaultResponseEntity {

    private Long id;

    private String username;

    private String role;
}
