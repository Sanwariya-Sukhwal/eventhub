package com.eventhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhub.entity.Organizer;

public interface OrganizerRepository extends JpaRepository<Organizer, Long> {

}