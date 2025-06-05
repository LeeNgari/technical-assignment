package com.example.back.exception;

public class PhoneNumberAlreadyExists extends RuntimeException {
    public PhoneNumberAlreadyExists(String message) {
        super(message);
    }
}
