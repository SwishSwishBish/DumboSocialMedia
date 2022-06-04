package com.sena.dumbobackend.controller;

import com.sena.dumbobackend.security.AuthResponse;
import com.sena.dumbobackend.security.Credentials;
import com.sena.dumbobackend.service.AuthService;
import com.sena.dumbobackend.shared.GenericResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    final AuthService authService;;

    @PostMapping("/api/1.0/auth")
    AuthResponse handleAuthentication(@RequestBody Credentials credentials) {
        return authService.authenticate(credentials);
    }

    @PostMapping("/api/1.0/logout")
    GenericResponse handleLogout(@RequestHeader(name = "Authorization") String authorization) {
        String token = authorization.substring(7);
        authService.clearToken(token);
        return new GenericResponse("Logout success.");
    }
}
