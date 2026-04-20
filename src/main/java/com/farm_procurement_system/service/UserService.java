package com.farm_procurement_system.service;

import com.farm_procurement_system.model.User;
import com.farm_procurement_system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User create(User user) {
        if (!StringUtils.hasText(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if (StringUtils.hasText(user.getEmail()) && repo.existsByEmailIgnoreCase(user.getEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User email already exists");
        }

        return repo.save(user);
    }

    public List<User> getAll() {
        return repo.findAll();
    }
}