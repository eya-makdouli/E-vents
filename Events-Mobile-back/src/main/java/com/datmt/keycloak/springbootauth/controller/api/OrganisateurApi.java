package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;
import com.datmt.keycloak.springbootauth.DTO.OrganisateurDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface OrganisateurApi {

        @CrossOrigin(origins = "*")
        @PostMapping(value = APP_ROOT +"/organisateur/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
        OrganisateurDTO save (@RequestBody OrganisateurDTO organisateurDTO);


        @CrossOrigin(origins = "*")
        @GetMapping(value = APP_ROOT +"/organisateur/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
        OrganisateurDTO findById(@PathVariable("id") Long id);

        @CrossOrigin(origins = "*")
        @GetMapping (value = APP_ROOT +"/organisateur/all" , produces = MediaType.APPLICATION_JSON_VALUE)
        List<OrganisateurDTO> findAll();

        @CrossOrigin(origins = "*")
        @DeleteMapping(value = APP_ROOT +"/organisateur/delete/{id}")
        void delete(@PathVariable("id") Long id);
    }


