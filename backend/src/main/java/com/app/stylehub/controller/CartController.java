package com.app.stylehub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.stylehub.dto.CartDTO;
import com.app.stylehub.service.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/cart/{cartId}/products/{productId}/quantity/{quantity}")
	public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long cartId, @PathVariable Long productId,
			@PathVariable Integer quantity) {
		CartDTO cartDTO = cartService.addCartItem(cartId, productId, quantity);
		return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.CREATED);
	}

	@PutMapping("/cart/{cartId}/products/{productId}/quantity/{quantity}")
	public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long cartId, @PathVariable Long productId, @PathVariable Integer quantity) {
		CartDTO cartDTO = cartService.updateProductQuantityInCart(cartId, productId, quantity);
		return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
	}
	
	@DeleteMapping("/cart/{cartId}/product/{productId}")
	public ResponseEntity<?> deleteProductFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
		cartService.removeCartItem(cartId, productId);
		return ResponseEntity.noContent().build();
	}

}
