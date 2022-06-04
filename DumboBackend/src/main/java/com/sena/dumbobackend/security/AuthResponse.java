package com.sena.dumbobackend.security;

import com.sena.dumbobackend.repository.dto.UserDto;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;

    private UserDto user;

}