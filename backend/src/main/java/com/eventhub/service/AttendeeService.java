package com.eventhub.service;

import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Attendee;
import com.eventhub.exception.AttendeeNotFoundException;
import com.eventhub.repository.AttendeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;

    // Create Attendee
    public ResponseStructure<Attendee> createAttendee(Attendee attendee) {

        Attendee savedAttendee = attendeeRepository.save(attendee);

        ResponseStructure<Attendee> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Attendee Created Successfully");
        response.setData(savedAttendee);

        return response;
    }

    // Get Attendee By Id
    public ResponseStructure<Attendee> getAttendeeById(Long id) {

        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(() ->
                        new AttendeeNotFoundException(
                                "Attendee with ID " + id + " not found"));

        ResponseStructure<Attendee> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Attendee Found");
        response.setData(attendee);

        return response;
    }

    // Update Attendee
    public ResponseStructure<Attendee> updateAttendee(Long id, Attendee updatedAttendee) {

        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(() ->
                        new AttendeeNotFoundException(
                                "Attendee with ID " + id + " not found"));

        attendee.setName(updatedAttendee.getName());
        attendee.setEmail(updatedAttendee.getEmail());
        attendee.setPhone(updatedAttendee.getPhone());

        Attendee savedAttendee = attendeeRepository.save(attendee);

        ResponseStructure<Attendee> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Attendee Updated Successfully");
        response.setData(savedAttendee);

        return response;
    }

    // Delete Attendee
    public ResponseStructure<String> deleteAttendee(Long id) {

        Attendee attendee = attendeeRepository.findById(id)
                .orElseThrow(() ->
                        new AttendeeNotFoundException(
                                "Attendee with ID " + id + " not found"));

        attendeeRepository.delete(attendee);

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Attendee Deleted Successfully");
        response.setData("Deleted");

        return response;
    }

    // Get All Attendees
    public ResponseStructure<Page<Attendee>> getAllAttendees(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Attendee> attendees = attendeeRepository.findAll(pageable);

        ResponseStructure<Page<Attendee>> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Attendees Retrieved Successfully");
        response.setData(attendees);

        return response;
    }
}