package com.app.stylehub.custom_exceptions;

public class ResourceAlreadyExistsException extends RuntimeException{
	public ResourceAlreadyExistsException(String message) {
		super(message);
	}
}
