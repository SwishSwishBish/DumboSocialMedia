package com.sena.dumbobackend.repository;

import com.sena.dumbobackend.repository.entity.FileAttachment;
import com.sena.dumbobackend.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface IFileAttachmentRepository extends JpaRepository<FileAttachment, Long> {

    List<FileAttachment> findByDateBeforeAndPostIsNull(Date date);
    List<FileAttachment> findByPostUser(User user);

}
