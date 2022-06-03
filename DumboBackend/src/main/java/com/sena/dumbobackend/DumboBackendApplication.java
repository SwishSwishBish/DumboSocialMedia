package com.sena.dumbobackend;

import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DumboBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(DumboBackendApplication.class, args);
    }


    @Bean
    CommandLineRunner createInitialUsers(UserService userService) {
        return (args) -> {
            for (int i = 1; i <= 10; i++){
                User user = new User();
                user.setUsername("user"+i);
                user.setDisplayName("display"+i);
                user.setPassword("Password1");
                userService.save(user);
            }
        };
    }
}
