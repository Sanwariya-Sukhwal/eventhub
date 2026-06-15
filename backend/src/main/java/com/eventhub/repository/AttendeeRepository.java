package com.eventhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhub.entity.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Long> {

}