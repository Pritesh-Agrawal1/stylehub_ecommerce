package com.app.stylehub.service;

import com.app.stylehub.dto.CartDTO;
import com.app.stylehub.entities.Cart;

public interface CartService {

	
	CartDTO addCartItem(Long cartId, Long productId, int quantity);
	
	void removeCartItem(Long cartId, Long productId);
	
	CartDTO updateProductQuantityInCart(Long cartId, Long productId, Integer quantity);
	
	Cart getCartByUserId(Long userId);

	void clearCart(Long userId);

}
