package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface LocationApi {

    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/location/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO save (@RequestBody LocationDTO dto);


    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findById(@PathVariable("id") Long id);


    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/city/{city}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findLocationByCity(@PathVariable("city") String city);


    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/country/{country}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findLocationByCountry(@PathVariable("country") String country);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/zipcode/{zipcode}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findLocationByZipCode(@PathVariable("zipcode") String zipcode);


    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findLocationByName(@PathVariable("name") String name);


    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/location/region/{region}", produces = MediaType.APPLICATION_JSON_VALUE)
    LocationDTO findLocationByRegion(@PathVariable("region") String region);

    @GetMapping (value = APP_ROOT +"/location/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<LocationDTO> findAll();


    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/location/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    void delete(@PathVariable("id") Long id);

    @GetMapping (value = APP_ROOT +"/location/citylike/{citylike}", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<LocationDTO> findAllByCityLike(@PathVariable("citylike") String citylike);

    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/location/deletecity/{city}")
    void deleteAllByCity(@PathVariable String city);

    }
