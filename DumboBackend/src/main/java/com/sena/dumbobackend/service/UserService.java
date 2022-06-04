package com.sena.dumbobackend.service;

import com.sena.dumbobackend.error.NotFoundException;
import com.sena.dumbobackend.repository.IUserRepository;
import com.sena.dumbobackend.repository.dto.UpdateUserDto;
import com.sena.dumbobackend.repository.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UserService {

    IUserRepository userRepository;
    PasswordEncoder passwordEncoder;
    FileService fileService;

    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
    }

    public void save(User user){
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }


    public User findByUsername(String username) {
        User inDB = userRepository.findByUsername(username);
        if(inDB ==null){
            throw new NotFoundException();
        }
        return inDB;
    }

    public Page<User> getAllUsers(Pageable page, User user) {
        if(user != null){
            return userRepository.findByUsernameNot(user.getUsername(), page);
        }
        return userRepository.findAll(page);
    }

    public User updateUser(String username, UpdateUserDto updatedUser) {
        User inDB = findByUsername(username);
        inDB.setDisplayName(updatedUser.getDisplayName());
        if(updatedUser.getProfileImage() != null) {
            String oldImageName= inDB.getProfileImage();
            try {
                String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getProfileImage());
                inDB.setProfileImage(storedFileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
            fileService.deleteProfileImage(oldImageName);
        }
        return userRepository.save(inDB);
    }

    public void deleteUser(String username) {
        User inDB = userRepository.findByUsername(username);
        fileService.deleteAllStoredFilesForUser(inDB);
        userRepository.delete(inDB);
    }
}
