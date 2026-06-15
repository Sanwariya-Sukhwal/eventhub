package com.eventhub.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.eventhub.dto.LoginRequest;
import com.eventhub.dto.LoginResponse;
import com.eventhub.dto.RegisterRequest;
import com.eventhub.dto.ResponseStructure;
import com.eventhub.entity.User;
import com.eventhub.repository.UserRepository;
import com.eventhub.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public ResponseStructure<User> register(RegisterRequest request) {

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        User savedUser = userRepository.save(user);

        ResponseStructure<User> response = new ResponseStructure<>();
        response.setStatusCode(201);
        response.setMessage("User Registered Successfully");
        response.setData(savedUser);

        return response;
    }

    public ResponseStructure<LoginResponse> login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        ResponseStructure<LoginResponse> response =
                new ResponseStructure<>();

        response.setStatusCode(200);
        response.setMessage("Login Successful");
        response.setData(new LoginResponse(token));

        return response;
    }
}