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
public class PaymentDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String cardNumber;

	private String expireMonth;

	private String expireYear;

	private String ccv;

}
