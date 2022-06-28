package com.datmt.keycloak.springbootauth.Validator;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class UserValidator {

    public static List<String> validate (UserDTO userDTO){
        List<String> errors = new ArrayList<>();

        if (userDTO == null || !StringUtils.hasLength(userDTO.getId())){
            errors.add("Cette Utilisateur Existe déja ") ;
        }

        if (!StringUtils.hasLength(userDTO.getFirstname())){
            errors.add("Veuillez renseigner le prenom d'utilisateur");
        }

        if (!StringUtils.hasLength(userDTO.getLastname())){
            errors.add("Veuillez renseigner le nom d'utilisateur");
        }
        if (!StringUtils.hasLength(userDTO.getEmail())){
            errors.add("Veuillez renseigner l'email d'utilisateur");
        }
        if (!StringUtils.hasLength(userDTO.getPassword())){
            errors.add("Veuillez renseigner le mot de passe d'utilisateur");
        }
        if (!StringUtils.hasLength(userDTO.getUsername())){
            errors.add("Veuillez renseigner le psudo d'utilisateur");
        }



        return errors;
    }

}
