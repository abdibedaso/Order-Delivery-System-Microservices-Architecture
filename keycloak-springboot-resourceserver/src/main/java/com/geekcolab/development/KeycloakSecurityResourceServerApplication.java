package com.geekcolab.development;

//import com.github.piomin.springboot.istio.annotation.EnableIstio;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
//@EnableIstio(version = "v1", timeout = 3, numberOfRetries = 3)
public class KeycloakSecurityResourceServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeycloakSecurityResourceServerApplication.class, args);
	}
}
