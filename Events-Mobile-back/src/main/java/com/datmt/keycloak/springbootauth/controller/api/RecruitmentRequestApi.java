package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.RecruitmentRequestDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface RecruitmentRequestApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/recruitment/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    RecruitmentRequestDTO save (@RequestBody RecruitmentRequestDTO recruitmentRequestDTO);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/recruitment/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    RecruitmentRequestDTO findById(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/recruitment/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<RecruitmentRequestDTO> findAll();


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/recruitment/delete/{id}")
    void delete(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/recruitment/update/{id}" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    RecruitmentRequestDTO update (@RequestBody RecruitmentRequestDTO recruitmentRequestDTO, @PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/recruitment/user/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<RecruitmentRequestDTO> findStaffRequestByUser_Id(@PathVariable String id);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/recruitment/staff/{id}/{accepted}/{event_id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<RecruitmentRequestDTO> findAllByOrg_IdAndAcceptedAndEvent_Id(@PathVariable String id,@PathVariable Boolean accepted ,@PathVariable Long event_id );


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/recruitment/duplicated/{accepted}/{event}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<RecruitmentRequestDTO> findAllByAcceptedAndEvent_Id(@PathVariable Boolean accepted, @PathVariable Long event);

}
