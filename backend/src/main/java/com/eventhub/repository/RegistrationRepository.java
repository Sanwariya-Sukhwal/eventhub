package com.eventhub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhub.entity.Event;
import com.eventhub.entity.Registration;

public interface RegistrationRepository
        extends JpaRepository<Registration, Long> {

    List<Registration> findByEvent(Event event);
}