package com.app.stylehub.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private double amount;
    private String paymentMethod;
    private String status; // e.g., "SUCCESS", "FAILED"
}