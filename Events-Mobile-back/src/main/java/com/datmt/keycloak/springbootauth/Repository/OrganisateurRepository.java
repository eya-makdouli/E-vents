package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.Organisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface OrganisateurRepository extends JpaRepository<Organisateur,Long> {

    Optional<Organisateur> findById(Long id );

}