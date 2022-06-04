package com.sena.dumbobackend.repository.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Token {
    @Id
    private String token;

    @ManyToOne
    private User user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Token token1 = (Token) o;
        return token != null && Objects.equals(token, token1.token);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}