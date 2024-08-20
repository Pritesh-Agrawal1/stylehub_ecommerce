package com.app.stylehub.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long productId;
	private String productName;
	private String description;
	private int quantity;
	private double price;
	private CategoryDTO categoryDto;
	
}
