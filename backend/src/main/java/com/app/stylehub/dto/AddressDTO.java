package com.app.stylehub.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDTO {
	@JsonProperty(access = Access.READ_ONLY)
    private Integer addressId;
	
    private String addressLine;
    private String city;
    private String state;
    private String country;
    private String zipCode;
}

