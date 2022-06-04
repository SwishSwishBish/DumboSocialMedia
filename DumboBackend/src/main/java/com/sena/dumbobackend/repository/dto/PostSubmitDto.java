package com.sena.dumbobackend.repository.dto;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class PostSubmitDto {

    @Size(min=1, max=1000)
    private String content;

    private long attachmentId;
}
