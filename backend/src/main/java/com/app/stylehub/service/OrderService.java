package com.app.stylehub.service;

import java.util.List;

import com.app.stylehub.dto.OrderDTO;
import com.app.stylehub.dto.PaymentDTO;

public interface OrderService {
	
	OrderDTO placeOrder(Long userId, PaymentDTO paymentDto);
	
    OrderDTO getOrder(Long orderId);
    
    List<OrderDTO> getUserOrders(Long userId);
}
