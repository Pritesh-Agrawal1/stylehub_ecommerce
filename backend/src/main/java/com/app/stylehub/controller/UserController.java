package com.app.stylehub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.stylehub.dto.ApiResponse;
import com.app.stylehub.dto.UserDTO;
import com.app.stylehub.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
//	@PostMapping
//	public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
//	   ApiResponse status = userService.createUser(userDTO);
//	    return ResponseEntity.status(HttpStatus.CREATED).body(status);
//	}
	
	// Get User by ID
    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO userDTO = userService.getUserById(userId);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    
    // Get all Users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> userList = userService.getAllUser(); // Assume getAllUsers returns a list of UserDTOs
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
    
    
    // Delete User by ID
    
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
       userService.deleteUserById(userId);     
       return ResponseEntity.noContent().build();
    }
}
