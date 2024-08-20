package com.app.stylehub.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.stylehub.custom_exceptions.ApiException;
import com.app.stylehub.custom_exceptions.UserNotFoundException;
import com.app.stylehub.dto.UserDTO;
import com.app.stylehub.entities.Cart;
import com.app.stylehub.entities.User;
import com.app.stylehub.repository.CartRepository;
import com.app.stylehub.repository.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CartRepository cartRepo;
	
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private ModelMapper mapper;

	
	@Override
	public UserDTO userRegistration(UserDTO reqDTO) {
		//mapping reqDTO --> User
		User user=mapper.map(reqDTO, User.class);
		if(userRepo.existsByEmail(reqDTO.getEmail()))
			throw new ApiException("Email already exists !!!");
		
		user.setPassword(encoder.encode(user.getPassword()));//pwd : encrypted using SHA
		// create new cart for user and save cart entity
		Cart cart = new Cart();
		cart.setUser(user);
		cart = cartRepo.save(cart);
		// set that cart for that user and save user
		user.setCart(cart);
		return mapper.map(userRepo.save(user), UserDTO.class);
	}
	
	
//	@Override
//	public ApiResponse createUser(UserDTO userDto) {
//		// mapping userDTO --> User
//		User user = mapper.map(userDto, User.class);
//
//		// create new cart for user and save cart entity
//		Cart cart = new Cart();
//		cart.setUser(user);
//		cart = cartRepo.save(cart);
//
//		// set that cart for that user and save user
//		user.setCart(cart);
//		userRepo.save(user);
//		return new ApiResponse("Added successfully");
//	}

	@Override
	public void deleteUserById(Long id) {
		Optional<User> user = userRepo.findById(id);
		if (user.isPresent()) {
			userRepo.deleteById(id);
		} else {
			throw new UserNotFoundException("User not found for id: " + id);
		}
	}

	@Override
	public List<UserDTO> getAllUser() {
		List<User> userList = userRepo.findAll();
		// Convert list of users to list of UserDTOs
		return userList.stream().map(user -> mapper.map(user, UserDTO.class)).collect(Collectors.toList());
	}

	@Override
	public UserDTO getUserById(Long id) {
		UserDTO userDto = userRepo.findById(id).map(user -> mapper.map(user, UserDTO.class))
				.orElseThrow(() -> new UserNotFoundException("User not exist for id :" + id));
		return userDto;

	}
	
	// UserServiceImpl.java
	@Override
	public UserDTO getUserByEmail(String email) {
		User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found for email: " + email));
	    
	    return mapper.map(user, UserDTO.class); // Ensure mapping to UserDTO
	}


}
