package com.datmt.keycloak.springbootauth.controller.api;
import com.datmt.keycloak.springbootauth.DTO.StaffDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface StaffApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/staff/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    StaffDTO save (@RequestBody StaffDTO staffDTO);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/staff/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    StaffDTO findById(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staff/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<StaffDTO> findAll();


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staff/delete/{id}")
    void delete(@PathVariable("id") Long id);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/staff/staffjob/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<StaffDTO> findAllByStaffJob_Id(@PathVariable Long id);


}
