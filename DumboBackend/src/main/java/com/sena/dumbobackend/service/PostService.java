package com.sena.dumbobackend.service;

import com.sena.dumbobackend.repository.IFileAttachmentRepository;
import com.sena.dumbobackend.repository.IPostRepository;
import com.sena.dumbobackend.repository.dto.PostSubmitDto;
import com.sena.dumbobackend.repository.entity.FileAttachment;
import com.sena.dumbobackend.repository.entity.Post;
import com.sena.dumbobackend.repository.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    IPostRepository postRepository;
    IFileAttachmentRepository fileAttachmentRepository;

    UserService userService;
    FileService fileService;

    public PostService(IPostRepository postRepository, IFileAttachmentRepository fileAttachmentRepository,FileService fileService, UserService userService) {
        super();
        this.postRepository = postRepository;
        this.fileAttachmentRepository = fileAttachmentRepository;
        this.fileService = fileService;
        this.userService = userService;
    }

    public void save(PostSubmitDto postSubmitDto, User user) {
        Post post= new Post();
        post.setContent(postSubmitDto.getContent());
        post.setTimestamp(new Date());
        post.setUser(user);
        postRepository.save(post);
        Optional<FileAttachment> optionalFileAttachment = fileAttachmentRepository.findById(postSubmitDto.getAttachmentId());
        if(optionalFileAttachment.isPresent()) {
            FileAttachment fileAttachment = optionalFileAttachment.get();
            fileAttachment.setPost(post);
            fileAttachmentRepository.save(fileAttachment);
        }
    }

    public Page<Post> findAllPosts(Pageable page) {
        return postRepository.findAll(page);
    }

    public Page<Post> getPostsOfUser(String username, Pageable page) {
        User inDB = userService.findByUsername(username);
        return postRepository.findByUser(inDB, page);
    }

    public Page<Post> getOldPosts(long id, String username, Pageable page) {
        Specification<Post> specification = idLessThan(id);
        if(username!=null){
            User inDB = userService.findByUsername(username);
            specification = specification.and(userIs(inDB));
        }
        return  postRepository.findAll(specification, page);
    }


    public long getNewPostsCount(long id, String username) {
        Specification<Post> specification = idGreaterThan(id);
        if(username!=null){
            User inDB = userService.findByUsername(username);
            specification = specification.and(userIs(inDB));
        }

        return postRepository.count(specification);
    }


    public List<Post> getNewPosts(long id,String username, Sort sort) {
        Specification<Post> specification = idGreaterThan(id);
        if(username!=null){
            User inDB = userService.findByUsername(username);
            specification = specification.and(userIs(inDB));
        }
        return postRepository.findAll(specification, sort);
    }

    Specification<Post> idLessThan(long id){
        return (root, query, criteriaBuilder) -> criteriaBuilder.lessThan(root.get("id"), id);
    }

    Specification<Post> userIs(User user){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user"), user);
    }

    Specification<Post> idGreaterThan(long id){
        return (root, query, criteriaBuilder) -> criteriaBuilder.greaterThan(root.get("id"), id);
    }

    public void delete(Long id) {
        Post inDB = postRepository.getOne(id);
        if(inDB.getFileAttachment() != null) {
            String fileName = inDB.getFileAttachment().getName();
            fileService.deleteAttachmentFile(fileName);
        }
        postRepository.deleteById(id);
    }
}
