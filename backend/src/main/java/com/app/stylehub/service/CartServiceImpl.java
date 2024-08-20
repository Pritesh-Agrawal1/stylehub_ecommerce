package com.app.stylehub.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.custom_exceptions.InvalidQuantityException;
import com.app.stylehub.custom_exceptions.ProductOutOfStockException;
import com.app.stylehub.custom_exceptions.ResourceNotFoundException;
import com.app.stylehub.dto.CartDTO;
import com.app.stylehub.entities.Cart;
import com.app.stylehub.entities.CartItem;
import com.app.stylehub.entities.Product;
import com.app.stylehub.repository.CartItemRepository;
import com.app.stylehub.repository.CartRepository;
import com.app.stylehub.repository.ProductRepository;

@Service
@Transactional
public class CartServiceImpl implements CartService {

	@Autowired
	private CartRepository cartRepo;

	@Autowired
	private CartItemRepository cartItemRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private ModelMapper mapper;

	@Override
	public CartDTO addCartItem(Long cartId, Long productId, int quantity) {

		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart not found for id :"+cartId));

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for id :"+productId));

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);

		
		if (product.getQuantity() == 0) {
			throw new ProductOutOfStockException(product.getProductName() + " is not available");
		}

		if (product.getQuantity() < quantity) {
			throw new InvalidQuantityException("Please, make an order of the " + product.getProductName()
					+ " less than or equal to the quantity " + product.getQuantity() + ".");
		}
		
		if (cartItem == null) {
			//throw new CartItemAlreadyExistsException("Product " + product.getProductName() + " already exists in the cart");
			CartItem newCartItem = new CartItem();
			newCartItem.setCart(cart);
			newCartItem.setProduct(product);
			newCartItem.setQuantity(quantity);
			newCartItem.setProductPrice(product.getPrice());
			cartItemRepo.save(newCartItem);
		}else {
			cartItem.setQuantity(cartItem.getQuantity() + quantity);
			cartItemRepo.save(cartItem);
		}

		///product.setQuantity(product.getQuantity() - quantity);
		cart.setTotalPrice(cart.getTotalPrice() + (product.getPrice() * quantity));
		cartRepo.save(cart);

		CartDTO cartDto = mapper.map(cart, CartDTO.class);
		// Maps each CartItem to its associated Product
		// converts this Product into a ProductDTO
		// List<ProductDTO> productDTOs = cart.getItems().stream()
			//	.map(cItem -> mapper.map(cItem.getProduct(), ProductDTO.class)).collect(Collectors.toList());

		//cartDto.setProducts(productDTOs);
		return cartDto;
	}

	@Override
	public void removeCartItem(Long cartId, Long productId) {
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("No cart found for id:"+cartId));

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);
		
		if (cartItem == null) {
	        throw new ResourceNotFoundException("No item found in cart for product id: " + productId);
	    }
		// Update cart total price
		cart.setTotalPrice(cart.getTotalPrice() - (cartItem.getProduct().getPrice() * cartItem.getQuantity()));

		// Update product quantity
	//	Product product = cartItem.getProduct();
//		product.setQuantity(product.getQuantity() + cartItem.getQuantity());

		// Delete cart item
		cartItemRepo.deleteCartItemByProductIdAndCartId(cartId, productId);

		// Save changes to the cart and product
		cartRepo.save(cart);
		//productRepo.save(product);
	}

	@Override
	public CartDTO updateProductQuantityInCart(Long cartId, Long productId, Integer quantity) {
		Cart cart = cartRepo.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("No cart found for id:"+cartId));

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product not found for id"+productId));

		if (product.getQuantity() == 0) {
			throw new ProductOutOfStockException(product.getProductName() + " is not available");
		}

		if (product.getQuantity() < quantity) {
			throw new InvalidQuantityException("Please, make an order of the " + product.getProductName()
					+ " less than or equal to the quantity " + product.getQuantity() + ".");
		}

		CartItem cartItem = cartItemRepo.findCartItemByProductIdAndCartId(cartId, productId);

		if (cartItem == null) {
	        throw new ResourceNotFoundException("No item found in cart for product id: " + productId);
	    }

		double cartPrice = cart.getTotalPrice() - (cartItem.getProductPrice() * cartItem.getQuantity());

		product.setQuantity(product.getQuantity() + cartItem.getQuantity() - quantity);

		cartItem.setQuantity(quantity);

		cart.setTotalPrice(cartPrice + (cartItem.getProductPrice() * quantity));

		cartItem = cartItemRepo.save(cartItem);

		CartDTO cartDTO = mapper.map(cart, CartDTO.class);

//		List<ProductDTO> productDTOs = cart.getItems()
//				.stream()
//				.map(cItem -> mapper.map(cItem.getProduct(), ProductDTO.class))
//				.collect(Collectors.toList());

		//cartDTO.setProducts(productDTOs);
		return cartDTO;
	}
	
	@Override
    public Cart getCartByUserId(Long userId) {
        Cart cart = cartRepo.findByUser_UserId(userId);
        return cart;
    }
	
	@Override
	public void clearCart(Long userId) {
	    Cart cart = getCartByUserId(userId);
	    // Clear the items from the cart
	    cart.setTotalPrice(0.0);
	    cart.getItems().clear();
	}


}
