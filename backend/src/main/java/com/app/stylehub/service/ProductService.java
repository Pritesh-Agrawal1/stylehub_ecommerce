package com.app.stylehub.service;

import java.util.List;

import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.ProductDTO;

public interface ProductService {

	ApiResponse addProduct(Long categoryId,ProductDTO productDto);
	void removeProductById(Long id);
	List<ProductDTO> getAllProduct();
	ProductDTO getProductById(Long id);
}
