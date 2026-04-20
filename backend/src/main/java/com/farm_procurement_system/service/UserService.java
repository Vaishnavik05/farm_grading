package com.farm_procurement_system.service;

import com.farm_procurement_system.model.User;
import com.farm_procurement_system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public User create(User user) {
        if (!StringUtils.hasText(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }

        if (StringUtils.hasText(user.getEmail()) && repo.existsByEmailIgnoreCase(user.getEmail().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return repo.save(user);
    }

    public List<User> getAll() {
        return repo.findAll();
    }

    @Transactional
    public void deleteByEmail(String email) {
        if (!StringUtils.hasText(email) || !repo.existsByEmailIgnoreCase(email.trim())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        repo.deleteByEmailIgnoreCase(email.trim());
    }
}