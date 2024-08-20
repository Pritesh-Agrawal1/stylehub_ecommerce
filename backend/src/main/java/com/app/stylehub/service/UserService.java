package com.app.stylehub.service;

import java.util.List;

import com.app.stylehub.dto.UserDTO;

public interface UserService {

	//add register/signup method
	UserDTO userRegistration(UserDTO reqDTO);
		
	//ApiResponse createUser(UserDTO userDto);
	
	void deleteUserById(Long id);
	
	List<UserDTO> getAllUser();
	
	UserDTO getUserById(Long id);
	
	UserDTO getUserByEmail(String email);
	   
}
