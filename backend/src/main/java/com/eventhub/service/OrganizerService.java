package com.eventhub.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Organizer;
import com.eventhub.exception.OrganizerNotFoundException;
import com.eventhub.repository.OrganizerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrganizerService {

    private final OrganizerRepository organizerRepository;

    // Create Organizer
    public ResponseStructure<Organizer> createOrganizer(Organizer organizer) {

        Organizer savedOrganizer = organizerRepository.save(organizer);

        ResponseStructure<Organizer> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Organizer Created Successfully");
        response.setData(savedOrganizer);

        return response;
    }

    // Get Organizer By Id
    public ResponseStructure<Organizer> getOrganizerById(Long id) {

        Organizer organizer = organizerRepository.findById(id)
                .orElseThrow(() ->
                        new OrganizerNotFoundException(
                                "Organizer with ID " + id + " not found"));

        ResponseStructure<Organizer> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Organizer Found");
        response.setData(organizer);

        return response;
    }
}