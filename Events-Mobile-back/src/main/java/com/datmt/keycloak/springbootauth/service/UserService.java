package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserDTO save (UserDTO userDTO);

    UserDTO findById(String id);

    UserDTO findUserByUsername(String Username);

    List<UserDTO> findAll();

    void delete(String id);

    UserDTO findUserByEmail(String email);

    Optional<UserDTO> update (String id , UserDTO dto);


    List<UserDTO> findAllByFirstnameLike(String firstname);
    List<UserDTO> findAllByIsStaff(Boolean isStaff);
}
