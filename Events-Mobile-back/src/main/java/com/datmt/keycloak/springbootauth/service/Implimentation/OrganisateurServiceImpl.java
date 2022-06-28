package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.OrganisateurDTO;
import com.datmt.keycloak.springbootauth.Exceptions.EntityNotFoundException;
import com.datmt.keycloak.springbootauth.Exceptions.ErrorCodes;
import com.datmt.keycloak.springbootauth.Exceptions.InvalidEntityException;
import com.datmt.keycloak.springbootauth.Model.Organisateur;
import com.datmt.keycloak.springbootauth.Repository.OrganisateurRepository;
import com.datmt.keycloak.springbootauth.Validator.OrganisateurValidator;
import com.datmt.keycloak.springbootauth.service.OrganisateurService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Log4j2
@Service
public class OrganisateurServiceImpl implements OrganisateurService {
    private OrganisateurRepository organisateurRepository;
    @Autowired
    public OrganisateurServiceImpl(OrganisateurRepository organisateurRepository) {
        this.organisateurRepository = organisateurRepository;
    }

    @Override
    public OrganisateurDTO save(OrganisateurDTO organisateurDTO) {

        return OrganisateurDTO.fromEntity(
                organisateurRepository.save(OrganisateurDTO.toEntity(organisateurDTO))
        );
    }

    @Override
    public OrganisateurDTO findById (Long id) {

        if (id == null) {
            log.error("id de l'organisateur est null !");
            return null;
        }
        Optional<Organisateur> organisateur = organisateurRepository.findById(id);
        OrganisateurDTO dto = OrganisateurDTO.fromEntity(organisateur.get());
        return Optional.of(dto).orElseThrow(() -> new EntityNotFoundException("Aucun organisateur avec l'id = " + id + " n'ete trouve",
                ErrorCodes.ORGANISATEUR_NOT_FOUND));


    }



    @Override
    public List<OrganisateurDTO> findAll() {
        return organisateurRepository.findAll().stream().map(OrganisateurDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (id== null) {
            log.error("id de l'organisateur est null !");
        }
        organisateurRepository.deleteById(id);
    }
}