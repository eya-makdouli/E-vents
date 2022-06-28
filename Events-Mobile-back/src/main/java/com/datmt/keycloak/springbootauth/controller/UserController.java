package com.datmt.keycloak.springbootauth.controller;


import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.http.requests.CreateUserRequest;
import com.datmt.keycloak.springbootauth.http.requests.LoginRequest;
import com.datmt.keycloak.springbootauth.http.requests.RefreshT;
//import com.datmt.keycloak.springbootauth.service.FlowableService;
import com.datmt.keycloak.springbootauth.service.KeycloakAdminClientService;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.RefreshToken;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.core.Response;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;

@RestController
@RequestMapping("/user")
public class UserController {
    private final KeycloakAdminClientService kcAdminClient;
    //private FlowableService flowableService;

    private final KeycloakProvider kcProvider;

    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(UserController.class);


    public UserController(KeycloakAdminClientService kcAdminClient, KeycloakProvider kcProvider) {
        this.kcProvider = kcProvider;
        this.kcAdminClient = kcAdminClient;
        //this.flowableService= flowableService;
    }


   // @PostMapping(value = "/create")
    //public ResponseEntity<?> createUser(@RequestBody CreateUserRequest user) {
        //Response createdResponse = kcAdminClient.createKeycloakUser(user);
     //   return ResponseEntity.status(createdResponse.getStatus()).build();

    //}

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AccessTokenResponse> login(@NotNull @RequestBody @AuthenticationPrincipal LoginRequest loginRequest, HttpServletResponse response) {

            Keycloak keycloak = kcProvider.newKeycloakBuilderWithPasswordCredentials(loginRequest.getUsername(), loginRequest.getPassword()).build();
        AccessTokenResponse accessTokenResponse = null;
            try {
                accessTokenResponse = keycloak.tokenManager().getAccessToken();
                Cookie cookie = new Cookie("token", accessTokenResponse.getToken());
                cookie.setMaxAge(10000);
                response.addCookie(cookie);
                return ResponseEntity.status(HttpStatus.OK).body(accessTokenResponse);

            } catch (BadRequestException ex) {
                LOG.warn("invalid account. User probably hasn't verified email.", ex);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(accessTokenResponse);
            }





    }
    @PostMapping ("/refresh")
    public ResponseEntity<String> refresh (@NotNull @RequestBody RefreshT refreshtoken) {
        String res = null;
        try {
            res  = kcProvider.refreshToken(refreshtoken.getRef());
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

   /* @GetMapping (path="/flowable")
    public String flowServices (){
        flowableService.registrateNewUser();
        return null;
    }


    */



	

}
