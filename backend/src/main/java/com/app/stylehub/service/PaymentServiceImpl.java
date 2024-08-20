package com.app.stylehub.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.dto.PaymentDTO;
import com.app.stylehub.entities.Order;
import com.app.stylehub.entities.Payment;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Override
    public Payment processPayment(Long orderId, PaymentDTO paymentDTO, Order order) {
        // Payment processing logic here
        // Example: interacting with a payment gateway

        Payment payment = new Payment();
        payment.setAmount(paymentDTO.getAmount());
        payment.setPaymentDate(LocalDate.now());
        payment.setPaymentMethod(paymentDTO.getPaymentMethod());
        payment.setOrder(order);
        payment.setStatus("SUCCESS"); // Or "FAILED" based on actual processing

        // Save payment details (if you have a PaymentRepository)
        // paymentRepository.save(payment);

        return payment;
    }
}
