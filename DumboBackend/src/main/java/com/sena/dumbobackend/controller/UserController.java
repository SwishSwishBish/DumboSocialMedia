package com.sena.dumbobackend.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.service.UserService;
import com.sena.dumbobackend.shared.GenericResponse;
import com.sena.dumbobackend.shared.Views;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/1.0/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created!");
    }

    @GetMapping("/api/1.0/users")
    @JsonView(Views.Base.class)
    List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}

