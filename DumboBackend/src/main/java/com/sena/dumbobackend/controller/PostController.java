package com.sena.dumbobackend.controller;

import com.sena.dumbobackend.repository.dto.PostDto;
import com.sena.dumbobackend.repository.dto.PostSubmitDto;
import com.sena.dumbobackend.repository.entity.User;
import com.sena.dumbobackend.service.PostService;
import com.sena.dumbobackend.shared.CurrentUser;
import com.sena.dumbobackend.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/1.0")
public class PostController {

    @Autowired
    PostService postService;

    @PostMapping("/posts")
    GenericResponse savePost(@Valid @RequestBody PostSubmitDto post,
                             @CurrentUser User user) {
        postService.save(post, user);
        return new GenericResponse("Post is saved.");
    }

    @GetMapping("/posts")
    Page<PostDto> getPosts(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return postService.findAllPosts(page).map(PostDto::new);
    }

    @GetMapping({"/posts/{id:[0-9]+}", "/users/{username}/posts/{id:[0-9]+}"})
    ResponseEntity<?> getPostsRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page,
                                       @PathVariable long id,
                                       @PathVariable(required=false) String username,
                                       @RequestParam(name="count", required = false, defaultValue = "false") boolean count,
                                       @RequestParam(name="direction", defaultValue = "before") String direction){
        if (count) {
            long newPostCount = postService.getNewPostsCount(id, username);
            Map<String, Long> response = new HashMap<>();
            response.put("count", newPostCount);
            return ResponseEntity.ok(response);
        }
        if(direction.equals("after")) {
            List<PostDto> newPosts = postService.getNewPosts(id, username, page.getSort())
                    .stream().map(PostDto::new).collect(Collectors.toList());
            return ResponseEntity.ok(newPosts);
        }
        return ResponseEntity.ok(postService.getOldPosts(id, username, page).map(PostDto::new));
    }

    @GetMapping("/users/{username}/posts")
    Page<PostDto> getPostsOfUser(@PathVariable String username,
                                 @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return postService.getPostsOfUser(username, page).map(PostDto::new);
    }

    @DeleteMapping("/posts/{id:[0-9]+}")
    @PreAuthorize("@postSecurity.isAllowedToDelete(#id, principal)")
    GenericResponse deletePost(@PathVariable Long id) {
        postService.delete(id);
        return new GenericResponse("Post removed.");
    }
}