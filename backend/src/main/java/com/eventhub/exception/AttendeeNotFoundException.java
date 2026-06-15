package com.eventhub.exception;

public class AttendeeNotFoundException extends RuntimeException {

    public AttendeeNotFoundException(String message) {
        super(message);
    }
}