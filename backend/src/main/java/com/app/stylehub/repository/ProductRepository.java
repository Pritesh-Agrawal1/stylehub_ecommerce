package com.app.stylehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.stylehub.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
