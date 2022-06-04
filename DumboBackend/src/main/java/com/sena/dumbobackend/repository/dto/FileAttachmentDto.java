package com.sena.dumbobackend.repository.dto;

import com.sena.dumbobackend.repository.entity.FileAttachment;
import lombok.Data;

@Data
public class FileAttachmentDto {

    private String name;
    private String fileType;

    public FileAttachmentDto(FileAttachment fileAttachment) {
        this.setName(fileAttachment.getName());
        this.fileType = fileAttachment.getFileType();
    }
}
