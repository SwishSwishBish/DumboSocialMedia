package com.sena.dumbobackend.repository;

import com.sena.dumbobackend.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
