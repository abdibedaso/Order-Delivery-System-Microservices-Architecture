package com.geekcolab.development.controller;

import com.geekcolab.development.model.UserDTO;
import com.geekcolab.development.services.KeyCloakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
@RequestMapping(value = "/user")
public class UserController {

	@Autowired
	KeyCloakService keyCloakService;

	@RequestMapping(value = "/create", method = RequestMethod.POST, produces="application/json")
	public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
		try {

			int id = keyCloakService.createUserInKeyCloak(userDTO);
			if(id == 409)
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			else
				return new ResponseEntity<>(HttpStatus.OK);

		} catch (Exception ex) {

			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

	}

	@GetMapping(value = "/info", produces="application/json")
	public ResponseEntity<?> userInfo(@AuthenticationPrincipal Jwt jwt) {

		try {
			return new ResponseEntity<>(keyCloakService.getUserInfo(jwt.getClaim("sub").toString()), HttpStatus.OK);
		}

		catch (Exception ex) {

			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

	}

	@GetMapping(value = "/restaurants", produces="application/json")
	public ResponseEntity<?> restaurants() {

		try {
			return new ResponseEntity<>(keyCloakService.getAllByRole("RESTAURANT"), HttpStatus.OK);
		}

		catch (Exception ex) {

			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

	}

	@GetMapping(value = "/customers", produces="application/json")
	public ResponseEntity<?> customers() {

		try {
			return new ResponseEntity<>(keyCloakService.getAllByRole("CUSTOMER"), HttpStatus.OK);
		}

		catch (Exception ex) {

			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

	}

	@GetMapping(value = "/drivers", produces="application/json")
	public ResponseEntity<?> drivers() {

		try {
			return new ResponseEntity<>(keyCloakService.getAllByRole("DRIVER"), HttpStatus.OK);
		}

		catch (Exception ex) {

			ex.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		}

	}

//	@PostMapping(value = "/logout", produces="application/json")
//	public ResponseEntity<?> logoutUser(HttpServletRequest request) {
//
//		request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//
//		AccessToken token = ((KeycloakPrincipal<?>) request.getUserPrincipal()).getKeycloakSecurityContext().getToken();
//
//		String userId = token.getSubject();
//
//		keyCloakService.logoutUser(userId);
//
//		return new ResponseEntity<>("Hi!, you have logged out successfully!", HttpStatus.OK);
//
//	}
//
//	@PatchMapping(value = "/update/password", produces="application/json")
//	public ResponseEntity<?> updatePassword(HttpServletRequest request, String newPassword) {
//
//		request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//
//		AccessToken token = ((KeycloakPrincipal<?>) request.getUserPrincipal()).getKeycloakSecurityContext().getToken();
//
//		String userId = token.getSubject();
//
//		keyCloakService.resetPassword(newPassword, userId);
//
//		return new ResponseEntity<>("Hi!, your password has been successfully updated!", HttpStatus.OK);
//
//	}

}
