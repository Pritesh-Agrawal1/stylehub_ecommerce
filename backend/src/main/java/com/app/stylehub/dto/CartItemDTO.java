package com.app.stylehub.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long cartItemId;
    private int quantity;
    private ProductDTO product;
    
    
}
