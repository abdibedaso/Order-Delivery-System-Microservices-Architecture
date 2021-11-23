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
public class AddressDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String zipCode;

	private String city;

	private String phoneNumber;

	private String hoseNumber;

	private String streetName;

	private String latitude;

	private String longitude;

}
