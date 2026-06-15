package com.eventhub.dto;

import lombok.Data;

@Data
public class RegistrationRequest {

    private Long eventId;
    private Long attendeeId;
}