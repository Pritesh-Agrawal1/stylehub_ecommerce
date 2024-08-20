package com.app.stylehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.stylehub.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	
	Cart findByUser_UserId(Long userId);
}
