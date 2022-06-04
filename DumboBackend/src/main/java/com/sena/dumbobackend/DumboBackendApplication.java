package com.sena.dumbobackend;

import com.sena.dumbobackend.repository.dto.PostSubmitDto;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.service.PostService;
import com.sena.dumbobackend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@SpringBootApplication
public class DumboBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(DumboBackendApplication.class, args);
    }


    @Bean
    @Profile("development")
    CommandLineRunner createInitialUsers(UserService userService, PostService postService) {
        return (args) -> {
            for (int i = 1; i <= 25; i++){
                User user = new User();
                user.setUsername("user"+i);
                user.setDisplayName("display"+i);
                user.setPassword("Password1");
                userService.save(user);

            for(int j = 1;j<=5;j++) {
                PostSubmitDto post = new PostSubmitDto();
                post.setContent("post (" +j + ") from user ("+i+")");
                postService.save(post, user);
            }
            }
        };
    }
}
