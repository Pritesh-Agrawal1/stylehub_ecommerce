package com.app.stylehub.dto;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.app.stylehub.entities.UserRole;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
	
	@JsonProperty(access = Access.READ_ONLY)
    private Long userId;
	
	@NotBlank(message = "First Name required")
    private String firstName;
    private String lastName;
    private String phoneNo;
    
    @Email(message = "Invalid Email!!!")
    private String email;
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    private UserRole role;
    private AddressDTO address;
   
    public UserDTO(String firstName, String lastName,String phoneNo,String email, String password, UserRole role, AddressDTO address) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNo = phoneNo;
		this.email = email;
		this.password = password;
		this.role = role;
		this.address = address;
	}
}
