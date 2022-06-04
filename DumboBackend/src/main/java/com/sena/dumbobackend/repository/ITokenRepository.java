package com.sena.dumbobackend.repository;

import com.sena.dumbobackend.repository.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITokenRepository extends JpaRepository<Token, String> {
}
