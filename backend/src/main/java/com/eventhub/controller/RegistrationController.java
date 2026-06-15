package com.eventhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.RegistrationRequest;
import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Registration;
import com.eventhub.service.RegistrationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<ResponseStructure<Registration>>
    registerAttendee(
            @RequestBody RegistrationRequest request) {

        return ResponseEntity.status(201)
                .body(
                        registrationService
                                .registerAttendee(request)
                );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Registration>>
    getRegistrationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                registrationService.getRegistrationById(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>>
    deleteRegistration(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                registrationService.deleteRegistration(id)
        );
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<ResponseStructure<List<Registration>>>
    getRegistrationsByEvent(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                registrationService
                        .getRegistrationsByEvent(eventId)
        );
    }
}