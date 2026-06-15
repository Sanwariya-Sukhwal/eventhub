package com.eventhub.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Attendee;
import com.eventhub.service.AttendeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/attendees")
@RequiredArgsConstructor
public class AttendeeController {

    private final AttendeeService attendeeService;

    @PostMapping
    public ResponseEntity<ResponseStructure<Attendee>> createAttendee(
            @RequestBody Attendee attendee) {

        return ResponseEntity.status(201)
                .body(attendeeService.createAttendee(attendee));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Attendee>> getAttendeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendeeService.getAttendeeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Attendee>> updateAttendee(
            @PathVariable Long id,
            @RequestBody Attendee attendee) {

        return ResponseEntity.ok(
                attendeeService.updateAttendee(id, attendee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteAttendee(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendeeService.deleteAttendee(id));
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<Page<Attendee>>> getAllAttendees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                attendeeService.getAllAttendees(
                        page,
                        size,
                        sortBy,
                        direction));
    }
}