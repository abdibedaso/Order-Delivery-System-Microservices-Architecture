package com.geekcolab.development.controller;

//import com.github.piomin.springboot.istio.annotation.EnableIstio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/driver")
//@EnableIstio(version = "v1", timeout = 3, numberOfRetries = 3)
public class DriverController {

	@PreAuthorize("hasRole('DRIVER')")
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<?> sayHello() {

		return new ResponseEntity<>("Hi! DRIVER, you are authorized to view this response!", HttpStatus.OK);

	}

}
