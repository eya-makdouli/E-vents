package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.Model.User;
import com.datmt.keycloak.springbootauth.Repository.UserRepository;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class KeycloakAdminClientService {
    @Value("${keycloak.realm}")
    public String realm;
    @Value("${keycloak.resource}")
    public String clientID;
    private final KeycloakProvider kcProvider;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;


@Autowired
    public KeycloakAdminClientService(KeycloakProvider keycloakProvider, UserRepository userRepository, PasswordEncoder passwordEncoder, UserService userService) {
        this.kcProvider = keycloakProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    this.userService = userService;
}

    public UserDTO createKeycloakUser(UserDTO user) {

        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();



        CredentialRepresentation credentialRepresentation = createPasswordCredentials(user.getPassword());

        UserRepresentation kcUser = new UserRepresentation();
        kcUser.setUsername(user.getUsername());
        kcUser.setCredentials(Collections.singletonList(credentialRepresentation));
        kcUser.setFirstName(user.getFirstname());
        kcUser.setLastName(user.getLastname());
        kcUser.setEmail(user.getEmail());
        kcUser.setEnabled(true);
        kcUser.setEmailVerified(false);

        Response response = usersResource.create(kcUser);

        if (response.getStatus() == 201) {
            Keycloak keycloak = kcProvider.newKeycloakBuilderWithPasswordCredentials(user.getUsername(), user.getPassword()).build();
            AccessTokenResponse accessTokenResponse = null;
            accessTokenResponse = keycloak.tokenManager().getAccessToken();



            String hashedpass = passwordEncoder.encode(user.getPassword());
           user.setPassword(hashedpass);
           user.setFirstname(kcUser.getFirstName());
           user.setLastname(kcUser.getLastName());
           user.setEmail(user.getEmail());
            user.setUsername(user.getUsername());
           user.setCreatedDate(Timestamp.from(Instant.now()));
           String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            user.setId(userId);
/*
                Keycloak keycloak1 = kcProvider.getInstance();
                Optional<UserRepresentation> user1 = keycloak1.realm(realm).users().search(user.getUsername()).stream().filter(u -> u.getUsername().equals(user.getUsername())).findFirst();
                UserRepresentation userRepresentation = user1.get();
                UserResource userResource = keycloak.realm(realm).users().get(userRepresentation.getId());
                RealmRepresentation realmRepresentation = keycloak.realm(realm).toRepresentation();
                List<RoleRepresentation> roles = userResource.roles().realmLevel().listAll();
                user.setRole(roles.toString());


 */




        }

        return  user;

    }

    private static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }


}
