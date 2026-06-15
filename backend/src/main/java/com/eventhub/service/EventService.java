package com.eventhub.service;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.Attendee;
import com.eventhub.entity.Event;
import com.eventhub.entity.Registration;
import com.eventhub.exception.EventNotFoundException;
import com.eventhub.repository.EventRepository;
import com.eventhub.repository.RegistrationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final RegistrationRepository registrationRepository;

    // Create Event
    public ResponseStructure<Event> createEvent(Event event) {

        Event savedEvent = eventRepository.save(event);

        ResponseStructure<Event> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.CREATED.value());
        response.setMessage("Event Created Successfully");
        response.setData(savedEvent);

        return response;
    }

    // Get Event By Id
    public ResponseStructure<Event> getEventById(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event with ID " + id + " not found"));

        ResponseStructure<Event> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Event Found");
        response.setData(event);

        return response;
    }

    // Update Event
    public ResponseStructure<Event> updateEvent(Long id, Event updatedEvent) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event with ID " + id + " not found"));

        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setEventDate(updatedEvent.getEventDate());
        event.setVenue(updatedEvent.getVenue());
        event.setOrganizer(updatedEvent.getOrganizer());

        Event savedEvent = eventRepository.save(event);

        ResponseStructure<Event> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Event Updated Successfully");
        response.setData(savedEvent);

        return response;
    }

    // Delete Event
    public ResponseStructure<String> deleteEvent(Long id) {

        Event event = eventRepository.findById(id)
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event with ID " + id + " not found"));

        eventRepository.delete(event);

        ResponseStructure<String> response = new ResponseStructure<>();
        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Event Deleted Successfully");
        response.setData("Deleted");

        return response;
    }

    // Get All Events
    public ResponseStructure<Page<Event>> getAllEvents(
            int page,
            int size,
            String sortBy,
            String direction) {

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Event> events = eventRepository.findAll(pageable);

        ResponseStructure<Page<Event>> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Events Retrieved Successfully");
        response.setData(events);

        return response;
    }

    // Get Event Attendees
    public ResponseStructure<List<Attendee>> getEventAttendees(Long eventId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new EventNotFoundException(
                                "Event with ID " + eventId + " not found"));

        List<Attendee> attendees = registrationRepository
                .findByEvent(event)
                .stream()
                .map(Registration::getAttendee)
                .toList();

        ResponseStructure<List<Attendee>> response =
                new ResponseStructure<>();

        response.setStatusCode(HttpStatus.OK.value());
        response.setMessage("Attendees Retrieved Successfully");
        response.setData(attendees);

        return response;
    }
}