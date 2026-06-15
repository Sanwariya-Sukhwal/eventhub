package com.eventhub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.eventhub.dto.ResponseStructure;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleEventNotFound(EventNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("Event Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AttendeeNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleAttendeeNotFound(AttendeeNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("Attendee Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RegistrationNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleRegistrationNotFound(RegistrationNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("Registration Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(VenueNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleVenueNotFound(VenueNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("Venue Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OrganizerNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleOrganizerNotFound(OrganizerNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("Organizer Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ResponseStructure<String>> handleUserNotFound(UserNotFoundException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage("User Not Found");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateRegistrationException.class)
    public ResponseEntity<ResponseStructure<String>> handleDuplicateRegistration(DuplicateRegistrationException ex) {

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage("Duplicate Registration");
        response.setData(ex.getMessage());

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}