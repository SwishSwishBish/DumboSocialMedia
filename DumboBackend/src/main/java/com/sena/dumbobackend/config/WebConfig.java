package com.sena.dumbobackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    AppConfig appConfig;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./"+appConfig.getUploadPath()+"/")
                .setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));
    }

    @Bean
    CommandLineRunner createStorageDirectories(){
        return  (args) -> {
            createFolder(appConfig.getUploadPath());
            createFolder(appConfig.getProfileStoragePath());
            createFolder(appConfig.getAttachmentStoragePath());
        };
    }

    private void createFolder(String path) {
        File folder = new File(path);
        boolean folderExist = folder.exists() && folder.isDirectory();
        if(!folderExist) {
            folder.mkdir();
        }
    }
}
