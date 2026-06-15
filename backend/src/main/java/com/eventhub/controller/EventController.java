package com.eventhub.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Attendee;
import com.eventhub.entity.Event;
import com.eventhub.service.EventService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<ResponseStructure<Event>> createEvent(
            @RequestBody Event event) {

        return ResponseEntity.status(201)
                .body(eventService.createEvent(event));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Event>> getEventById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                eventService.getEventById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Event>> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event) {

        return ResponseEntity.ok(
                eventService.updateEvent(id, event));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteEvent(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                eventService.deleteEvent(id));
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<Page<Event>>> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "eventDate") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                eventService.getAllEvents(
                        page,
                        size,
                        sortBy,
                        direction));
    }

    @GetMapping("/{eventId}/attendees")
    public ResponseEntity<ResponseStructure<List<Attendee>>> getEventAttendees(
            @PathVariable Long eventId) {

        return ResponseEntity.ok(
                eventService.getEventAttendees(eventId));
    }
}