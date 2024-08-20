package com.app.stylehub.advice;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.app.stylehub.custom_exceptions.InvalidQuantityException;
import com.app.stylehub.custom_exceptions.ProductOutOfStockException;
import com.app.stylehub.custom_exceptions.ResourceAlreadyExistsException;
import com.app.stylehub.custom_exceptions.ResourceNotFoundException;
import com.app.stylehub.custom_exceptions.UserNotFoundException;
import com.app.stylehub.dto.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ProductOutOfStockException.class)
	public ResponseEntity<String> handleProductOutOfStockException(ProductOutOfStockException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(InvalidQuantityException.class)
	public ResponseEntity<String> handleInvalidQuantityException(InvalidQuantityException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ResourceAlreadyExistsException.class)
	public ResponseEntity<String> handleCartItemAlreadyExistsException(ResourceAlreadyExistsException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}

	// method level anno to tell SC , following is an exc handling method : to
	// handle MethodArgumentNotValidException
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("in method arg invalid " + e);
		List<FieldError> fieldErrors = e.getFieldErrors();// list of fiels having validation errs
		Map<String, String> map = fieldErrors.stream()
				.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
	}
	
	@ExceptionHandler(AuthenticationException.class)
	@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
	public ApiResponse handleAuthenticationException(AuthenticationException e) {
		System.out.println("in authentication exception " + e);
		return new ApiResponse(e.getMessage());
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(value = HttpStatus.FORBIDDEN)
	public ApiResponse handleAccessDeniedException(AccessDeniedException e) {
		System.out.println("in access denied  exception " + e);
		return new ApiResponse(e.getMessage());
	}

	// method level anno to tell SC , following is an exc handling method : to
	// handle any other remaining exc => catch all
	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ApiResponse handleAnyException(RuntimeException e) {
		System.out.println("in catch-all " + e);
		return new ApiResponse(e.getMessage());
	}

}
