package com.eventhub.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Venue;
import com.eventhub.service.VenueService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;

    @PostMapping
    public ResponseEntity<ResponseStructure<Venue>> createVenue(
            @RequestBody Venue venue) {

        return ResponseEntity.status(201)
                .body(venueService.createVenue(venue));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Venue>> getVenueById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                venueService.getVenueById(id));
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<Page<Venue>>> getAllVenues(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return ResponseEntity.ok(
                venueService.getAllVenues(
                        page,
                        size,
                        sortBy,
                        direction));
    }
}