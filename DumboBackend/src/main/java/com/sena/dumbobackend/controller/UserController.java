package com.sena.dumbobackend.controller;

import com.sena.dumbobackend.repository.dto.UpdateUserDto;
import com.sena.dumbobackend.repository.dto.UserDto;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.service.UserService;
import com.sena.dumbobackend.shared.CurrentUser;
import com.sena.dumbobackend.shared.GenericResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User created.");
    }

    @GetMapping("/users")
    Page<UserDto> getAllUsers(Pageable page, @CurrentUser User user){
        return userService.getAllUsers(page, user).map(UserDto::new);
    }

    @GetMapping("/users/{username}")
    UserDto getUser(@PathVariable String username){
        User user = userService.findByUsername(username);
        return new UserDto(user);
    }

    @PutMapping("/users/{username}")
    @PreAuthorize("#username == principal.username") //Spring Expression Language (SpEL)
    UserDto updateUser(@Valid @RequestBody UpdateUserDto updatedUser, @PathVariable String username){
        User user = userService.updateUser(username, updatedUser);
        return new UserDto(user);
    }

    @DeleteMapping("/users/{username}")
    @PreAuthorize("#username == principal.username")
    GenericResponse deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        return new GenericResponse("User is removed.");
    }
}

