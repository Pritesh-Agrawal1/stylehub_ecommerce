package com.app.stylehub.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.stylehub.dto.SigninRequest;
import com.app.stylehub.dto.SigninResponse;
import com.app.stylehub.dto.UserDTO;
import com.app.stylehub.security.JwtUtils;
import com.app.stylehub.service.UserService;

@RestController
@RequestMapping("/users")
public class UserSignInSignupController {
	@Autowired
	private UserService userService;

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private AuthenticationManager authMgr;

	// sign up
	/*
	 * URL - http://host:port/users/signup Method - POST request payload : sign up
	 * DTO (user details) resp : In case of success : Auth Resp DTO :mesg + JWT
	 * token + SC 201 In case of failure : SC 401
	 * 
	 */
	@PostMapping("/signup")
	public ResponseEntity<?> userSignup(@RequestBody @Valid UserDTO dto) {
		System.out.println("in sign up " + dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.userRegistration(dto));
	}

	/*
	 * URL - http://host:port/users/signin Method - POST request payload : Auth req
	 * DTO : email n password resp : In case of success : Auth Resp DTO :mesg + JWT
	 * token + SC 201 In case of failure : SC 401
	 * 
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid SigninRequest request) {
		System.out.println("in sign in" + request);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword());
		Authentication verifiedToken = authMgr.authenticate(token);
		
		// Retrieve user details
	    String email = request.getEmail();
	    UserDTO user = userService.getUserByEmail(email);
		
		SigninResponse resp = new SigninResponse(jwtUtils.generateJwtToken(verifiedToken), "Successful Auth!!!!", user);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}

}
