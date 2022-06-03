package com.sena.dumbobackend.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.sena.dumbobackend.repository.IUserRepository;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.shared.CurrentUser;
import com.sena.dumbobackend.shared.Views;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    final IUserRepository userRepository;

    @PostMapping("/api/1.0/auth")
    @JsonView(Views.Base.class)
    ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
        return ResponseEntity.ok(user);
    }
}
