package com.eventhub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhub.dto.LoginRequest;
import com.eventhub.dto.LoginResponse;
import com.eventhub.dto.RegisterRequest;
import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.User;
import com.eventhub.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseStructure<User>> register(
            @RequestBody RegisterRequest request) {

        return ResponseEntity.status(201)
                .body(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseStructure<LoginResponse>> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }
}