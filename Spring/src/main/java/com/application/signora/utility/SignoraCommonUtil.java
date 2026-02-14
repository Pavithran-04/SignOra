package com.application.signora.utility;

import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class SignoraCommonUtil {

    public <T> boolean isBlank(T parameter) {
        return Objects.isNull(parameter);
    }

}
