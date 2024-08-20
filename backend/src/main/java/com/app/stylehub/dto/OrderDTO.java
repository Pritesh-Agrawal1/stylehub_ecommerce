package com.app.stylehub.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
	@JsonProperty(access = Access.READ_ONLY)
	private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private double totalAmount;
    private String status;
    private List<OrderItemDTO> items;
    private PaymentDTO payment; 
}
