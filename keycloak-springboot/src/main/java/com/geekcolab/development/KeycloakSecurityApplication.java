package com.geekcolab.development;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class KeycloakSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(KeycloakSecurityApplication.class, args);
	}
}
