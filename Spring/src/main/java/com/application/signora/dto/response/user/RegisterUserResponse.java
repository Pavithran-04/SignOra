package com.application.signora.dto.response.user;

import com.application.signora.dto.response.DefaultResponseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper=false)
public class RegisterUserResponse extends DefaultResponseEntity {
    private String username;
}
