package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;
import com.datmt.keycloak.springbootauth.DTO.OrganisateurDTO;
import com.datmt.keycloak.springbootauth.controller.api.OrganisateurApi;
import com.datmt.keycloak.springbootauth.service.OrganisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController

public class OrganisateurController implements OrganisateurApi {
    private OrganisateurService organisateurService;
@Autowired
    public OrganisateurController(OrganisateurService organisateurService) {
        this.organisateurService = organisateurService;
    }


    @Override
    public OrganisateurDTO save(OrganisateurDTO organisateurDTO) {
        return organisateurService.save(organisateurDTO);
    }


    @Override
    public OrganisateurDTO findById(Long id) {
        return organisateurService.findById( id );
    }

    @Override
    public List<OrganisateurDTO> findAll() {
        return organisateurService.findAll();
    }

    @Override
    public void delete(Long id) {
    organisateurService.delete(id);

    }
}
