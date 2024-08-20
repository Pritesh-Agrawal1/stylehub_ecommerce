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
import com.app.stylehub.dto.ProductDTO;
import com.app.stylehub.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/{categoryId}")
	public ResponseEntity<?> insertProduct(@RequestBody ProductDTO productDTO,@PathVariable Long categoryId) {
		ApiResponse status = productService.addProduct(categoryId, productDTO);
		return ResponseEntity.status(HttpStatus.CREATED).body(status);
	}

	@GetMapping("/{productId}")
	public ResponseEntity<ProductDTO> findProductById(@PathVariable Long productId) {
		ProductDTO productDTO = productService.getProductById(productId);
		return new ResponseEntity<>(productDTO, HttpStatus.OK);
	}

	// Get all Products
	@GetMapping
	public ResponseEntity<List<ProductDTO>> getProducts() {
		List<ProductDTO> productList = productService.getAllProduct();// Assume getAllUsers returns a list of UserDTOs
		return new ResponseEntity<>(productList, HttpStatus.OK);
	}

	// Delete Product by ID
	@DeleteMapping("/{productId}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
		productService.removeProductById(productId);
		return ResponseEntity.noContent().build();
	}
}
