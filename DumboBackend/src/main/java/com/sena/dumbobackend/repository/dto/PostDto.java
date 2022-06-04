package com.sena.dumbobackend.repository.dto;

import com.sena.dumbobackend.repository.entity.Post;
import lombok.Data;

@Data
public class PostDto {

    private Long id;
    private String content;
    private Long timestamp;
    private UserDto user;
    private  FileAttachmentDto fileAttachment;

    public  PostDto(Post post){
        this.setId(post.getId());
        this.setContent(post.getContent());
        this.setTimestamp(post.getTimestamp().getTime());
        this.setUser(new UserDto(post.getUser()));
        if(post.getFileAttachment() != null) {
            this.fileAttachment = new FileAttachmentDto(post.getFileAttachment());
        }

    }
}
