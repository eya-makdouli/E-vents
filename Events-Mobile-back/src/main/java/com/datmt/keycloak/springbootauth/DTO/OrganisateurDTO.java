package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.Organisateur;
import com.datmt.keycloak.springbootauth.Model.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class OrganisateurDTO {
    private Long id;
    private List<User> user;
    private List<Event> events ;

    public static OrganisateurDTO fromEntity(Organisateur organisateur){
        if(organisateur == null){
            return null;
        }
        return OrganisateurDTO.builder()
                .id(organisateur.getId())
                .user(organisateur.getUser())
                .events(organisateur.getEvents())
                .build();
    }

    public static Organisateur toEntity(OrganisateurDTO organisateurDTO) {
        if (organisateurDTO == null) {
            return null;
        }
        Organisateur organisateur = new Organisateur();
        organisateur.setId(organisateurDTO.getId());
        organisateur.setUser(organisateurDTO.getUser());
        organisateur.setEvents(organisateurDTO.getEvents());
        return organisateur;
    }
}