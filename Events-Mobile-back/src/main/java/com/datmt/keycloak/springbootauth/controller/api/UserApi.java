package com.datmt.keycloak.springbootauth.controller.api;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

public interface UserApi {

    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/user/update/{idUser}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    Optional<UserDTO> update (@PathVariable("idUser") String id , @RequestBody UserDTO dto);

    @CrossOrigin(origins = "*")
    @PostMapping (value = APP_ROOT +"/user/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    UserDTO save (@RequestBody UserDTO dto);


    @GetMapping (value = APP_ROOT +"/user/id/{idUser}", produces = MediaType.APPLICATION_JSON_VALUE)
    UserDTO findById(@PathVariable("idUser") String id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/user/username/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
    UserDTO findUserByUsername(@PathVariable("username") String Username);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/user/email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    UserDTO findUserByEmail(@PathVariable("email") String Email);


    @GetMapping (value = APP_ROOT +"/user/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<UserDTO> findAll();

    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/user/delete/{idUser}", produces = MediaType.APPLICATION_JSON_VALUE)
    void delete(@PathVariable("idUser") String id);

    @GetMapping (value = APP_ROOT +"/user/firstname/{firstname}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<UserDTO> findAllByFirstnameLike(@PathVariable String firstname);

    @GetMapping (value = APP_ROOT +"/user/isstaff/{isStaff}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<UserDTO> findAllByIsStaff(@PathVariable Boolean isStaff);


}

