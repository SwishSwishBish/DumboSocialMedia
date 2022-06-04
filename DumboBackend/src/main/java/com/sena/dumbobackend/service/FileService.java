package com.sena.dumbobackend.service;

import com.sena.dumbobackend.config.AppConfig;
import com.sena.dumbobackend.repository.IFileAttachmentRepository;
import com.sena.dumbobackend.repository.entity.FileAttachment;
import com.sena.dumbobackend.repository.entity.User;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@EnableScheduling
public class FileService {

@Autowired
    AppConfig appConfig;

    Tika tika;

    IFileAttachmentRepository fileAttachmentRepository;

    public FileService(AppConfig appConfig, IFileAttachmentRepository fileAttachmentRepository) {
        super();
        this.appConfig = appConfig;
        this.tika = new Tika();
        this.fileAttachmentRepository = fileAttachmentRepository;
    }

    public String writeBase64EncodedStringToFile(String profileImage) throws IOException {
        String fileName = generateRandomName()+".png";
        File target = new File(appConfig.getProfileStoragePath() + "/" + fileName);
        OutputStream outputStream = new FileOutputStream(target);

        byte[] base64encoded = Base64.getDecoder().decode(profileImage);

        outputStream.write(base64encoded);
        outputStream.close();
        return fileName;
    }

    public String generateRandomName() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void deleteProfileImage(String oldImageName) {
        if(oldImageName == null) return;
        deleteFile(Paths.get(appConfig.getProfileStoragePath(), oldImageName));
    }

    public void deleteAttachmentFile(String oldImageName) {
        if(oldImageName == null) {
            return;
        }
        deleteFile(Paths.get(appConfig.getAttachmentStoragePath(), oldImageName));
    }

    private void deleteFile(Path path) {
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String detectType(String base64) {
        byte[] base64encoded = Base64.getDecoder().decode(base64);
        return detectType(base64encoded);
    }

    public String detectType(byte[] arr) {
        return tika.detect(arr);
    }

    public FileAttachment savePostAttachment(MultipartFile file) {
        String fileName = generateRandomName()+".png";
        File target = new File(appConfig.getAttachmentStoragePath() + "/" + fileName);
        String fileType = null;
        try {
            byte[] arr = file.getBytes();
            OutputStream outputStream = new FileOutputStream(target);
            outputStream.write(arr);
            outputStream.close();
            fileType = detectType(arr);
        } catch (IOException e) {
            e.printStackTrace();
        }
        FileAttachment attachment = new FileAttachment();
        attachment.setName(fileName);
        attachment.setDate(new Date());
        attachment.setFileType(fileType);
        return fileAttachmentRepository.save(attachment);
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void cleanupStorage() {
        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
        List<FileAttachment> filesToBeDeleted = fileAttachmentRepository.findByDateBeforeAndPostIsNull(twentyFourHoursAgo);
        for(FileAttachment file : filesToBeDeleted) {
            deleteAttachmentFile(file.getName());
            fileAttachmentRepository.deleteById(file.getId());
        }
    }

    public void deleteAllStoredFilesForUser(User inDB) {
        deleteProfileImage(inDB.getProfileImage());
        List<FileAttachment> filesToBeRemoved = fileAttachmentRepository.findByPostUser(inDB);
        for(FileAttachment file: filesToBeRemoved) {
            deleteAttachmentFile(file.getName());
        }
    }
}