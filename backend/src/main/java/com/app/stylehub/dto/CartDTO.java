package com.app.stylehub.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long cartId;
	private List<CartItemDTO> items;
	private Double totalPrice = 0.0;
	
}
