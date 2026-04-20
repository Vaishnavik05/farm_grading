package com.farm_procurement_system.repository;

import com.farm_procurement_system.model.User;
import com.farm_procurement_system.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmailIgnoreCase(String email);

    java.util.Optional<User> findByEmailIgnoreCase(String email);

    List<User> findByRole(Role role);
}