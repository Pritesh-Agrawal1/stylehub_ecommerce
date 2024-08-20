package com.app.stylehub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.stylehub.dto.OrderDTO;
import com.app.stylehub.dto.PaymentDTO;
import com.app.stylehub.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	
	@PostMapping
	public ResponseEntity<OrderDTO> createOrder(@RequestParam Long userId, @RequestBody(required = false) PaymentDTO paymentDto) {
		OrderDTO orderDto = orderService.placeOrder(userId, paymentDto);
		return new ResponseEntity<>(orderDto, HttpStatus.CREATED);
	}

	@GetMapping("/{orderId}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
		OrderDTO orderDto = orderService.getOrder(orderId);
		return new ResponseEntity<>(orderDto, HttpStatus.OK);
	}

	@GetMapping("/getAll/{userId}")
	public ResponseEntity<List<OrderDTO>> getUserOrders(@PathVariable Long userId) {
		List<OrderDTO> orderList = orderService.getUserOrders(userId);
		return new ResponseEntity<>(orderList, HttpStatus.OK);
	}
	
}
