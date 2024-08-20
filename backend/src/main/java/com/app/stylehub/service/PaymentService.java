package com.app.stylehub.service;

import com.app.stylehub.dto.PaymentDTO;
import com.app.stylehub.entities.Order;
import com.app.stylehub.entities.Payment;

public interface PaymentService {

	Payment processPayment(Long orderId, PaymentDTO paymentDTO, Order order);
}
