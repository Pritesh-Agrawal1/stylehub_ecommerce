package com.app.stylehub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.stylehub.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long>{
	
	List<Order> findByUser_UserId(Long userId);
	
	
}
