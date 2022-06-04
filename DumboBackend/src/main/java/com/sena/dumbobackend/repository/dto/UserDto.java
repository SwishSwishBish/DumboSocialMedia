package com.sena.dumbobackend.repository.dto;

import com.sena.dumbobackend.repository.entity.User;
import lombok.Data;

@Data
public class UserDto {

    private String username;
    private String displayName;
    private String profileImage;

    public UserDto(User user) {
        this.setUsername((user.getUsername()));
        this.setDisplayName(user.getDisplayName());
        this.setProfileImage(user.getProfileImage());
    }
}
