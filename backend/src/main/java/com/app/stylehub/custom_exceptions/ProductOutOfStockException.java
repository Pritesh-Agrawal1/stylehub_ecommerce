package com.app.stylehub.custom_exceptions;

public class ProductOutOfStockException extends RuntimeException{
	public ProductOutOfStockException(String message) {
		super(message);
	}
}

