package com.app.stylehub.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.app.stylehub.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

		Optional<User> findByEmail(String email);
		boolean existsByEmail(String email);
}
