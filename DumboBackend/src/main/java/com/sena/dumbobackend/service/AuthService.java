package com.sena.dumbobackend.service;

import com.sena.dumbobackend.error.AuthException;
import com.sena.dumbobackend.repository.ITokenRepository;
import com.sena.dumbobackend.repository.IUserRepository;
import com.sena.dumbobackend.repository.dto.UserDto;
import com.sena.dumbobackend.repository.entity.Token;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.security.AuthResponse;
import com.sena.dumbobackend.security.Credentials;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    IUserRepository userRepository;

    PasswordEncoder passwordEncoder;

    ITokenRepository tokenRepository;

    public AuthService( IUserRepository userRepository, PasswordEncoder passwordEncoder, ITokenRepository tokenRepository) {
        super();
        this.userRepository= userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
    }

    public AuthResponse authenticate(Credentials credentials) {
        User inDB = userRepository.findByUsername(credentials.getUsername());
        if(inDB == null) {
            throw new AuthException();
        }
        boolean matches = passwordEncoder.matches(credentials.getPassword(), inDB.getPassword());
        if(!matches) {
            throw new AuthException();
        }
        UserDto userDto = new UserDto(inDB);
        String token = generateRandomToken();

        Token tokenEntity = new Token();
        tokenEntity.setToken(token);
        tokenEntity.setUser(inDB);
        tokenRepository.save(tokenEntity);
        AuthResponse response = new AuthResponse();
        response.setUser(userDto);
        response.setToken(token);
        return response;
    }

    private String generateRandomToken() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    @Transactional
    public UserDetails getUserDetails(String token) {
        Optional<Token> optionalToken = tokenRepository.findById(token);
        return optionalToken.<UserDetails>map(Token::getUser).orElse(null);
    }

    public void clearToken(String token) {
        tokenRepository.deleteById(token);
    }
}