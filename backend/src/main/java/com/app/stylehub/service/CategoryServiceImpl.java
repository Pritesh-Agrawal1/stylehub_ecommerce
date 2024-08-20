package com.app.stylehub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.custom_exceptions.ResourceAlreadyExistsException;
import com.app.stylehub.custom_exceptions.ResourceNotFoundException;
import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.CategoryDTO;
import com.app.stylehub.dto.UserDTO;
import com.app.stylehub.entities.Category;
import com.app.stylehub.entities.User;
import com.app.stylehub.repository.CategoryRepository;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse createCategory(CategoryDTO categoryDto) {
		Category savedCategory = categoryRepo.findByCategoryName(categoryDto.getCategoryName());
		if (savedCategory != null) {
			throw new ResourceAlreadyExistsException("Category with the name '" + categoryDto.getCategoryName() + "' already exists !!!");
		}
		Category category = mapper.map(categoryDto, Category.class);
		categoryRepo.save(category);
		return new ApiResponse("New category added");
	}

	@Override
	public void deleteCategory(Long categoryId) {
		Category category = categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("No category found with ID: " + categoryId));
		categoryRepo.delete(category);
	}

	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> catList = categoryRepo.findAll();
		return catList.stream().map(category -> mapper.map(category, CategoryDTO.class)).collect(Collectors.toList());
	}
	


}
