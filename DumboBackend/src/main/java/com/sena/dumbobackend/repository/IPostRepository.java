package com.sena.dumbobackend.repository;

import com.sena.dumbobackend.repository.entity.Post;
import com.sena.dumbobackend.repository.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IPostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {
    Page<Post> findByUser(User inDB, Pageable page);
}
