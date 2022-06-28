package com.datmt.keycloak.springbootauth.Handlers;

import com.datmt.keycloak.springbootauth.Exceptions.ErrorCodes;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ErrorDTO {
    private Integer httpCode;
    private ErrorCodes errorCodes;
    private String message;
    private List<String> errors = new ArrayList<>();
}
