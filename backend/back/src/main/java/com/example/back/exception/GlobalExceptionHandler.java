package com.example.back.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.util.HashMap;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.badRequest().body(errors);
    }
    @ExceptionHandler(EmailAlreadyExists.class)
    public ResponseEntity<Map<String, String>> handleEmailAlreadyExistsException(
            EmailAlreadyExists ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "Email address already exists");
        return ResponseEntity.badRequest().body(errors);
    }
    @ExceptionHandler(PhoneNumberAlreadyExists.class)
    public ResponseEntity<Map<String, String>> handlePhoneNumberAlreadyExistsException(
            PhoneNumberAlreadyExists ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "Phone number already exists");
        return ResponseEntity.badRequest().body(errors);
    }
    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEmployeeNotFoundException(
            EmployeeNotFoundException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("message", "Employee not found");
        return ResponseEntity.badRequest().body(errors);
    }


}
