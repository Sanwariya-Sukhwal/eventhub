package com.eventhub.service;

import java.time.LocalDate;
import java.util.List;

import com.eventhub.entity.Attendee;
import com.eventhub.repository.AttendeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.eventhub.dto.RegistrationRequest;
import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Event;
import com.eventhub.entity.Registration;
import com.eventhub.exception.EventNotFoundException;
import com.eventhub.exception.RegistrationNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.RegistrationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventRepository eventRepository;
    private final AttendeeRepository attendeeRepository;

    // Register Attendee
    public ResponseStructure<Registration> registerAttendee(
            RegistrationRequest request) {

        Event event = eventRepository.findById(request.getEventId())
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event not found"));

        Attendee attendee = attendeeRepository
                .findById(request.getAttendeeId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Attendee not found"));

        Registration registration = Registration.builder()
                .event(event)
                .attendee(attendee)
                .registrationDate(LocalDate.now())
                .build();

        Registration savedRegistration =
                registrationRepository.save(registration);

        ResponseStructure<Registration> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Registration Successful");
        response.setData(savedRegistration);

        return response;
    }

    // Get Registration By Id
    public ResponseStructure<Registration> getRegistrationById(Long id) {

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() ->
                        new RegistrationNotFoundException(
                                "Registration not found"));

        ResponseStructure<Registration> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Registration Found");
        response.setData(registration);

        return response;
    }

    // Delete Registration
    public ResponseStructure<String> deleteRegistration(Long id) {

        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() ->
                        new RegistrationNotFoundException(
                                "Registration not found"));

        registrationRepository.delete(registration);

        ResponseStructure<String> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Registration Deleted Successfully");
        response.setData("Deleted");

        return response;
    }

    // Get Registrations By Event
    public ResponseStructure<List<Registration>>
    getRegistrationsByEvent(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event not found"));

        List<Registration> registrations =
                registrationRepository.findByEvent(event);

        ResponseStructure<List<Registration>> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Registrations Retrieved Successfully");
        response.setData(registrations);

        return response;
    }
}