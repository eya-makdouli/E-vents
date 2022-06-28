package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.StaffDTO;
import com.datmt.keycloak.springbootauth.DTO.StaffJobDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface StaffJobApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/staffjob/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    StaffJobDTO save (@RequestBody StaffJobDTO staffJobDTO);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/staffjob/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    StaffJobDTO findById(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staffjob/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<StaffJobDTO> findAll();

    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/staffjob/delete/{id}")
    void delete(@PathVariable("id") Long id);
}
