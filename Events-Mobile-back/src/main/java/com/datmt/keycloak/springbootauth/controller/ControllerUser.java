package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.controller.api.UserApi;
import com.datmt.keycloak.springbootauth.service.KeycloakAdminClientService;
import com.datmt.keycloak.springbootauth.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
public class ControllerUser implements UserApi {
    private final KeycloakAdminClientService kcAdminClient;
    private final KeycloakProvider kcProvider;

    private UserService userService;
    @Autowired
    public ControllerUser(KeycloakAdminClientService kcAdminClient, KeycloakProvider kcProvider, UserService userService){
        this.kcAdminClient = kcAdminClient;
        this.kcProvider = kcProvider;
        this.userService=userService;
    }


    @Override
    public Optional<UserDTO> update(String id, UserDTO dto) {

        return userService.update(id, dto);
    }
//inscription
    @Override
    public UserDTO save(UserDTO dto) {
        UserDTO createdResponse = kcAdminClient.createKeycloakUser(dto);
        return userService.save(createdResponse);
    }

    @Override
    public UserDTO findById(String id) {
        return userService.findById(id);
    }

    @Override
    public UserDTO findUserByUsername(String Username) {

        return userService.findUserByUsername(Username);
    }

    @Override
    public UserDTO findUserByEmail(String Email) {
        return userService.findUserByEmail(Email);
    }

    @Override
    public List<UserDTO> findAll() {
        return userService.findAll();
    }

    @Override
    public void delete(String id) {
        userService.delete(id);
    }

    @Override
    public List<UserDTO> findAllByFirstnameLike(String firstname) {
        return userService.findAllByFirstnameLike("%"+firstname+"%");
    }

    @Override
    public List<UserDTO> findAllByIsStaff(Boolean isStaff) {
        return userService.findAllByIsStaff(isStaff);
    }
}
