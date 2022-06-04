package com.sena.dumbobackend.repository.dto;

import com.sena.dumbobackend.validator.FileType;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class UpdateUserDto {

    @NotNull
    @Size(min = 4, max = 50)
    private String displayName;

    @FileType(types= {"jpeg", "png"})
    private String profileImage;
}
