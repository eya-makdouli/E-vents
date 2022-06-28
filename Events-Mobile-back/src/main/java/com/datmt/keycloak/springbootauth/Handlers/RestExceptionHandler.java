package com.datmt.keycloak.springbootauth.Handlers;

import com.datmt.keycloak.springbootauth.Exceptions.EntityNotFoundException;
import com.datmt.keycloak.springbootauth.Exceptions.InvalidEntityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorDTO> handleException(EntityNotFoundException exception, WebRequest webRequest){
        final HttpStatus notFound = HttpStatus.NOT_FOUND;
        ErrorDTO error =  ErrorDTO.builder()
                .errorCodes(exception.getErrorCodes())
                .httpCode(notFound.value())
                .message(exception.getMessage())
                .build();
        return new ResponseEntity<>(error , notFound);
    }
    @ExceptionHandler(InvalidEntityException.class)
    public ResponseEntity<ErrorDTO> handleException(InvalidEntityException exception , WebRequest webRequest){
        final HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        ErrorDTO error =  ErrorDTO.builder()
                .errorCodes(exception.getErrorCodes())
                .httpCode(badRequest.value())
                .message(exception.getMessage())
                .errors(exception.getErrors())
                .build();
        return new ResponseEntity<>(error , badRequest);

    }

}
