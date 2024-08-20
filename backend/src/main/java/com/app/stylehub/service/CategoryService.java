package com.app.stylehub.service;

import java.util.List;

import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.CategoryDTO;

public interface CategoryService {
	
	ApiResponse createCategory(CategoryDTO categoryDto);
	void deleteCategory(Long categoryId);
	List<CategoryDTO> getAllCategories();
}
