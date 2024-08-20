package com.app.stylehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.stylehub.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	Category findByCategoryName(String categoryName);
}
