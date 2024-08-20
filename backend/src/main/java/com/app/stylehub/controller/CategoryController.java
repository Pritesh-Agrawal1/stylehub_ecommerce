package com.app.stylehub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.CategoryDTO;
import com.app.stylehub.dto.UserDTO;
import com.app.stylehub.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@PostMapping
	public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDto) {
		ApiResponse status=categoryService.createCategory(categoryDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(status);
		
	}
	
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
		categoryService.deleteCategory(categoryId);
		return ResponseEntity.noContent().build();
	}
	
	// Get all Users
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getCategories() {
        List<CategoryDTO> catList = categoryService.getAllCategories(); 
        return new ResponseEntity<>(catList, HttpStatus.OK);
    }
    
}
