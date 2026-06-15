package com.eventhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Organizer;
import com.eventhub.service.OrganizerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/organizers")
@RequiredArgsConstructor
public class OrganizerController {

    private final OrganizerService organizerService;

    @PostMapping
    public ResponseEntity<ResponseStructure<Organizer>> createOrganizer(
            @RequestBody Organizer organizer) {

        return ResponseEntity.status(201)
                .body(organizerService.createOrganizer(organizer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Organizer>> getOrganizerById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                organizerService.getOrganizerById(id));
    }
}