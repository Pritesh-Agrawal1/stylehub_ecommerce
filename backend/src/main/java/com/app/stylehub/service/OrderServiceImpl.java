package com.app.stylehub.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.custom_exceptions.ProductOutOfStockException;
import com.app.stylehub.custom_exceptions.ResourceNotFoundException;
import com.app.stylehub.dto.OrderDTO;
import com.app.stylehub.dto.PaymentDTO;
import com.app.stylehub.entities.Cart;
import com.app.stylehub.entities.CartItem;
import com.app.stylehub.entities.Order;
import com.app.stylehub.entities.OrderItem;
import com.app.stylehub.entities.OrderStatus;
import com.app.stylehub.entities.Payment;
import com.app.stylehub.entities.Product;
import com.app.stylehub.repository.OrderRepository;
import com.app.stylehub.repository.ProductRepository;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepo;

	@Autowired
	private ProductRepository productRepo;

	@Autowired
	private CartService cartService;
	
	@Autowired
	private PaymentService paymentService;

	@Autowired
	private ModelMapper mapper;

	public OrderDTO placeOrder(Long userId, PaymentDTO paymentDto) {
		// found cart here
		Cart cart = cartService.getCartByUserId(userId);

		if (cart == null) {
			throw new ResourceNotFoundException("Cart not found for user with ID: " + userId);
		}

		if (cart.getItems().isEmpty()) {
			throw new ResourceNotFoundException("Cart is empty for user with ID: " + userId);
		}

		Order order = createOrder(cart);
		List<OrderItem> orderItemList = createOrderItems(order, cart);
		order.setOrderItems(new ArrayList<>(orderItemList));
		order.setTotalAmount(calculateTotalAmount(orderItemList));
	
		Order savedOrder = orderRepo.save(order);
		cartService.clearCart(userId);
		
		// Process payment
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setAmount(paymentDto.getAmount());
        paymentDTO.setPaymentMethod("Credit Card"); // Example, this should be dynamic
        Payment payment = paymentService.processPayment(savedOrder.getOrderId(), paymentDTO, savedOrder);
        savedOrder.setPayment(payment);
        orderRepo.save(savedOrder);

		
		OrderDTO orderDto = mapper.map(savedOrder, OrderDTO.class);
		orderDto.setUserId(userId);
		return orderDto;
	}

	private Order createOrder(Cart cart) {
		Order order = new Order();
		order.setUser(cart.getUser());
		order.setOrderStatus(OrderStatus.PENDING);
		order.setOrderDate(LocalDate.now());
		return order;
	}

	private List<OrderItem> createOrderItems(Order order, Cart cart) {
		// Create a new list to hold the OrderItem objects
		List<OrderItem> orderItems = new ArrayList<>();

		// Iterate over each CartItem in the Cart
		for (CartItem cartItem : cart.getItems()) {
			// Retrieve the Product associated with the CartItem
			Product product = cartItem.getProduct();

			if (product.getQuantity() < cartItem.getQuantity()) {
				throw new ProductOutOfStockException("Insufficient stock for product with ID: " + product.getProductId());
			}
			// Update the Product stock
			product.setQuantity(product.getQuantity() - cartItem.getQuantity());

			// Save the updated Product to the repository
			productRepo.save(product);

			// Create a new OrderItem and add it to the list
			OrderItem orderItem = new OrderItem(order, product, cartItem.getQuantity(), cartItem.getProductPrice());
			orderItems.add(orderItem);
		}
		// Return the list of OrderItem objects
		return orderItems;
	}

	private double calculateTotalAmount(List<OrderItem> orderItemList) {
		double totalAmount = 0.0;

		// Iterate over each OrderItem in the list
		for (OrderItem item : orderItemList) {
			// Calculate the item amount: price * quantity
			double itemAmount = item.getPrice() * item.getQuantity();
			// Add the item amount to the total amount
			totalAmount += itemAmount;
		}
		// Return the total amount
		return totalAmount;
	}

	@Override
	public OrderDTO getOrder(Long orderId) {
		Order order = orderRepo.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
		OrderDTO orderDto = mapper.map(order, OrderDTO.class);
		return orderDto;
	}

	@Override
	public List<OrderDTO> getUserOrders(Long userId) {
		List<Order> orders = orderRepo.findByUser_UserId(userId);

		if (orders.isEmpty()) {
			throw new ResourceNotFoundException("No orders found for user with ID: " + userId);
		}
		List<OrderDTO> orderList = orders.stream().map(order -> mapper.map(order, OrderDTO.class))
				.collect(Collectors.toList());
		return orderList;
	}

}
