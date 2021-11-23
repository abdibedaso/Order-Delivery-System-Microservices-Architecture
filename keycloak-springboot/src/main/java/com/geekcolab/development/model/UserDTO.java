package com.geekcolab.development.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String userName;

	private String password;

	private String email;

	private String firstName;

	private String lastName;

	private AddressDTO address;

	private PaymentDTO payment;

	private String role;

}
