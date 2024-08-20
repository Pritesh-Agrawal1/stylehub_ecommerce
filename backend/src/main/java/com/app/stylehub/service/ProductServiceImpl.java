package com.app.stylehub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.custom_exceptions.ResourceAlreadyExistsException;
import com.app.stylehub.custom_exceptions.ResourceNotFoundException;
import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.CategoryDTO;
import com.app.stylehub.dto.ProductDTO;
import com.app.stylehub.entities.Category;
import com.app.stylehub.entities.Product;
import com.app.stylehub.repository.CategoryRepository;
import com.app.stylehub.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private CategoryRepository categoryRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addProduct(Long categoryId, ProductDTO productDto) {
		//find category
		Category category = categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("No category found with ID: " + categoryId));
		CategoryDTO catDto = mapper.map(category, CategoryDTO.class);
		boolean isProductNotPresent = true;

		List<Product> productList = category.getProducts();
		//check product already exists
		for (int i = 0; i < productList.size(); i++) {
			if (productList.get(i).getProductName().equals(productDto.getProductName())) {
				isProductNotPresent = false;
				break;
			}
		}
		//if not exist then add product
		if (isProductNotPresent) {
			productDto.setCategoryDto(catDto);
			Product newProduct = mapper.map(productDto, Product.class);
			newProduct.setCategory(category);
			productRepo.save(newProduct);
			return new ApiResponse("New product added successfully!!");
		} else {
			throw new ResourceAlreadyExistsException("Product with name '" + productDto.getProductName() + "' already exists in the category.");
		}
	}

	
	@Override
	public List<ProductDTO> getAllProduct() {
		List<Product> products = productRepo.findAll();
		// Convert list of products to list of ProductDTOs
		
		List<ProductDTO> productList = products.stream()
				.map(product -> mapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
		return productList;
	}

	@Override
	public ProductDTO getProductById(Long id) {
		return productRepo.findById(id)
				.map(product->mapper.map(product,ProductDTO.class))
				.orElseThrow(()->new ResourceNotFoundException("Product not Found for id :"+id));
	}

	@Override
	public void removeProductById(Long id) {
		Optional<Product> product=productRepo.findById(id);
		if(product.isPresent()) {
			productRepo.deleteById(id);
		}else {
			throw new ResourceNotFoundException("Product not found for ID: " + id);
		}
	}

}
