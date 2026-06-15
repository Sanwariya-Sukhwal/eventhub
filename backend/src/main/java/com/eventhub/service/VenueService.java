package com.eventhub.service;

import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Venue;
import com.eventhub.exception.VenueNotFoundException;
import com.eventhub.repository.VenueRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final VenueRepository venueRepository;

    // Create Venue
    public ResponseStructure<Venue> createVenue(Venue venue) {

        Venue savedVenue = venueRepository.save(venue);

        ResponseStructure<Venue> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Venue Created Successfully");
        response.setData(savedVenue);

        return response;
    }

    // Get Venue By Id
    public ResponseStructure<Venue> getVenueById(Long id) {

        Venue venue = venueRepository.findById(id)
                .orElseThrow(() ->
                        new VenueNotFoundException(
                                "Venue with ID " + id + " not found"));

        ResponseStructure<Venue> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Venue Found");
        response.setData(venue);

        return response;
    }

    // Get All Venues
    public ResponseStructure<Page<Venue>> getAllVenues(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Venue> venues = venueRepository.findAll(pageable);

        ResponseStructure<Page<Venue>> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("All Venues Fetched Successfully");
        response.setData(venues);

        return response;
    }
}