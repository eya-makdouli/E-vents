package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.StaffRequestDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface StaffRequestApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/staffRequest/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    StaffRequestDTO save (@RequestBody StaffRequestDTO staffRequestDTO);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/staffRequest/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    StaffRequestDTO findById(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staffRequest/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<StaffRequestDTO> findAll();


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staffRequest/delete/{id}")
    void delete(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/staffRequest/update/{id}" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    StaffRequestDTO update (@RequestBody StaffRequestDTO staffRequestDTO, @PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staffRequest/user/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    StaffRequestDTO findStaffRequestByUser_Id(@PathVariable String id);
}
