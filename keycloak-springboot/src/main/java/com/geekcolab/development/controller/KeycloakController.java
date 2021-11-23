package com.geekcolab.development.controller;

import com.geekcolab.development.services.KeyCloakService;
import com.geekcolab.development.model.UserCredentials;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/keycloak")
public class KeycloakController {

	@Autowired
	KeyCloakService keyCloakService;

	@PostMapping(value = "/token", produces="application/json")
	public ResponseEntity<?> getTokenUsingCredentials(@RequestBody UserCredentials userCredentials) {

		String responseToken = null;
		try {

			responseToken = keyCloakService.getToken(userCredentials);

		} catch (Exception e) {

			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseToken, HttpStatus.OK);

	}

	@GetMapping(value = "/refreshToken", produces="application/json")
	public ResponseEntity<?> getTokenUsingRefreshToken(@RequestHeader(value = "Authorization") String refreshToken) {

		String responseToken = null;
		try {

			responseToken = keyCloakService.getByRefreshToken(refreshToken);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

		return new ResponseEntity<>(responseToken, HttpStatus.OK);

	}

}
