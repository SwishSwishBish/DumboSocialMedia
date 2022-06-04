package com.sena.dumbobackend.security;

import com.sena.dumbobackend.repository.IPostRepository;
import com.sena.dumbobackend.repository.entity.Post;
import com.sena.dumbobackend.repository.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service(value = "postSecurity")
public class PostSecurityService {

    @Autowired
    IPostRepository postRepository;

    public boolean isAllowedToDelete(long id, User loggedInUser) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if(optionalPost.isEmpty()) {
            return false;
        }

        Post post = optionalPost.get();
        return Objects.equals(post.getUser().getId(), loggedInUser.getId());
    }
}
