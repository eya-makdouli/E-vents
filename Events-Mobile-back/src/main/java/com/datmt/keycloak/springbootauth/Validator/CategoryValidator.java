package com.datmt.keycloak.springbootauth.Validator;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;

import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CategoryValidator {
    public static List<String> validate (CategoryDTO categoryDTO){
        List<String> errors = new ArrayList<>();

       if (!StringUtils.hasLength(categoryDTO.getGenre())){
        errors.add("Veuillez renseigner le genre d'événement");
    }
        return errors;
    }
}
