package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.OrganisateurDTO;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Model.Organisateur;

import java.util.List;

public interface OrganisateurService {

    OrganisateurDTO save (OrganisateurDTO organisateurDTO);

    OrganisateurDTO findById(Long id);

    List<OrganisateurDTO> findAll();

    void delete(Long id);

}
