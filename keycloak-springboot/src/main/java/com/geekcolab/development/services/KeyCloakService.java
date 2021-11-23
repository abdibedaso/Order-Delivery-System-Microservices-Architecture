package com.geekcolab.development.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

import javax.ws.rs.core.Response;

import com.geekcolab.development.model.UserDTO;
import com.geekcolab.development.model.UserCredentials;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class KeyCloakService {

	@Value("${keycloak.credentials.secret}")
	private String SECRETKEY;

	@Value("${keycloak.resource}")
	private String CLIENTID;

	@Value("${keycloak.auth-server-url}")
	private String AUTHURL;

	@Value("${keycloak.realm}")
	private String REALM;

	public String getToken(UserCredentials userCredentials) {

		String responseToken = null;
		try {

			String username = userCredentials.getUsername();

			List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
			urlParameters.add(new BasicNameValuePair("grant_type", "password"));
			urlParameters.add(new BasicNameValuePair("client_id", CLIENTID));
			urlParameters.add(new BasicNameValuePair("username", username));
			urlParameters.add(new BasicNameValuePair("password", userCredentials.getPassword()));
			urlParameters.add(new BasicNameValuePair("client_secret", SECRETKEY));

			responseToken = sendPost(urlParameters);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseToken;

	}

	public String getByRefreshToken(String refreshToken) {

		String responseToken = null;
		try {

			List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
			urlParameters.add(new BasicNameValuePair("grant_type", "refresh_token"));
			urlParameters.add(new BasicNameValuePair("client_id", CLIENTID));
			urlParameters.add(new BasicNameValuePair("refresh_token", refreshToken));
			urlParameters.add(new BasicNameValuePair("client_secret", SECRETKEY));

			responseToken = sendPost(urlParameters);

		} catch (Exception e) {
			e.printStackTrace();

		}

		return responseToken;
	}

	public Map<String, List<String>> getUserInfo(String userId) {

		String responseToken = null;

		try {

			UsersResource userResource = getKeycloakUserResource();
			UserRepresentation userRepresentation = userResource.get(userId).toRepresentation();

			Map<String, List<String>> stringListMap = userRepresentation.getAttributes();
			stringListMap.put("id", List.of(userRepresentation.getId()));
			stringListMap.put("userName", List.of(userRepresentation.getUsername()));
			stringListMap.put("email", List.of(userRepresentation.getEmail()));
			stringListMap.put("firstname", List.of(userRepresentation.getFirstName()));
//			stringListMap.put("lastName", List.of(userRepresentation.getLastName()));
//			stringListMap.put("role", List.of(userRepresentation.getFirstName()));

			return stringListMap;

		} catch (Exception e) {
			e.printStackTrace();

		}

		return null;
	}


	public int createUserInKeyCloak(UserDTO userDTO) {

		int statusId = 0;
		try {

			UsersResource userResource = getKeycloakUserResource();

			UserRepresentation user = new UserRepresentation();
			user.setUsername(userDTO.getUserName());
			user.setEmail(userDTO.getEmail());
			user.setFirstName(userDTO.getFirstName());
			user.setLastName(userDTO.getLastName());
			user.singleAttribute("zipCode", userDTO.getAddress().getZipCode());
			user.singleAttribute("city", userDTO.getAddress().getCity());
			user.singleAttribute("hoseNumber", userDTO.getAddress().getHoseNumber());
			user.singleAttribute("streetName", userDTO.getAddress().getStreetName());
			user.singleAttribute("latitude", userDTO.getAddress().getLatitude());
			user.singleAttribute("longitude", userDTO.getAddress().getLongitude());
			user.singleAttribute("cardNumber", userDTO.getPayment().getCardNumber());
			user.singleAttribute("expireMonth", userDTO.getPayment().getExpireMonth());
			user.singleAttribute("expireYear", userDTO.getPayment().getExpireYear());
			user.singleAttribute("ccv", userDTO.getPayment().getCcv());
			user.setEnabled(true);

			// Create user
			Response result = userResource.create(user);
			System.out.println("Keycloak create user response code>>>>" + result.getStatus());

			statusId = result.getStatus();

			if (statusId == 201) {

				String userId = result.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

				System.out.println("User created with userId:" + userId);

				// Define password credential
				CredentialRepresentation passwordCred = new CredentialRepresentation();
				passwordCred.setTemporary(false);
				passwordCred.setType(CredentialRepresentation.PASSWORD);
				passwordCred.setValue(userDTO.getPassword());

				// Set password credential
				userResource.get(userId).resetPassword(passwordCred);

				// set role
				RealmResource realmResource = getRealmResource();
				RoleRepresentation savedRoleRepresentation = realmResource.roles().get(userDTO.getRole()).toRepresentation();
				realmResource.users().get(userId).roles().realmLevel().add(Arrays.asList(savedRoleRepresentation));

				UserRepresentation userRepresentation = userResource.get(userId).toRepresentation();

//				enum Role{CUSTOMER,DRIVER, RESTAURANT}
				@AllArgsConstructor
				@NoArgsConstructor
				class email {String userName; String email; String role;}
				email email= new email(userDTO.getUserName(), userDTO.getEmail(), userDTO.getRole());

				kafkaTemplateForPayment.send("UserCreation", email);

				System.out.println("FirstName==" + userRepresentation.getFirstName() + " created in keycloak successfully");
				System.out.println("Username==" + userDTO.getUserName() + " created in keycloak successfully");

			}

			else if (statusId == 409) {
				statusId = 409;
				System.out.println("Username==" + userDTO.getUserName() + " already present in keycloak");

			} else {
				statusId = 409;
				System.out.println("Username==" + userDTO.getUserName() + " could not be created in keycloak");

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return statusId;

	}

	@Autowired
	private KafkaTemplate<String, Object> kafkaTemplateForPayment;

	// after logout user from the keycloak system. No new access token will be
	// issued.
	public void logoutUser(String userId) {

		UsersResource userResource = getKeycloakUserResource();

		userResource.get(userId).logout();

	}

	public Set<UserRepresentation> getAllByRole(String role) {


		Keycloak kc = KeycloakBuilder.builder().serverUrl(AUTHURL).realm("master").username("admin").password("admin")
				.clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
				.build();

//		RealmResource realmResource = kc.realm(REALM);
		RoleResource roleResource = kc.realm(REALM)
				.roles().get(role);
		return roleResource.getRoleUserMembers();

//		RoleResource roleResource = realmResource.roles().get(role);
//		Set<UserRepresentation> userRepresentations = roleResource.getRoleUserMembers();
//
//		Map<String, String> stringMap = null;
//
//		for (UserRepresentation user : userRepresentations) {
////			stringListMap = user.getAttributes();
//			stringMap.put("id", user.getId());
////			stringListMap.put("userName", List.of(user.getFirstName()));
//			stringMap.put("email", user.getEmail());
//			stringMap.put("firstname", user.getFirstName());
////			stringListMap.put("lastName", List.of(user.getFirstName()));
////			stringListMap.put("role", List.of(user.getFirstName()));
//		}

//		return userRepresentations;
	}

	// Reset password
	public void resetPassword(String newPassword, String userId) {

		UsersResource userResource = getKeycloakUserResource();

		// Define password credential
		CredentialRepresentation passwordCred = new CredentialRepresentation();
		passwordCred.setTemporary(false);
		passwordCred.setType(CredentialRepresentation.PASSWORD);
		passwordCred.setValue(newPassword.toString().trim());

		// Set password credential
		userResource.get(userId).resetPassword(passwordCred);

	}

	private UsersResource getKeycloakUserResource() {

		Keycloak kc = KeycloakBuilder.builder().serverUrl(AUTHURL).realm("master").username("admin").password("admin")
				.clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
				.build();

		RealmResource realmResource = kc.realm(REALM);
		UsersResource usersResources = realmResource.users();

		return usersResources;
	}

	private RealmResource getRealmResource() {

		Keycloak kc = KeycloakBuilder.builder().serverUrl(AUTHURL).realm("master").username("admin").password("admin")
				.clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
				.build();

		RealmResource realmResource = kc.realm(REALM);

		return realmResource;

	}

	private String sendPost(List<NameValuePair> urlParameters) throws Exception {

		HttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(AUTHURL + "/realms/" + REALM + "/protocol/openid-connect/token");

		post.setEntity(new UrlEncodedFormEntity(urlParameters));

		HttpResponse response = client.execute(post);

		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}

		return result.toString();

	}

}
