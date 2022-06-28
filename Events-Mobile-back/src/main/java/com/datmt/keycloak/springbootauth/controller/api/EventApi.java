package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.EventDTO;
import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface EventApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/event/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    EventDTO save (@RequestBody EventDTO dto);
    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/event/id/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    EventDTO findById(@PathVariable("id") Long id);
    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/event/name/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    EventDTO findEventByEventName(@PathVariable("name") String name);
    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/event/createdDate/{createdDate}", produces = MediaType.APPLICATION_JSON_VALUE)
    EventDTO findEventByCreatedDate(@PathVariable("createdDate") Date createdDate);

    @GetMapping (value = APP_ROOT +"/event/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    List<EventDTO> findAll();
    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/event/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    void delete(@PathVariable("id") Long id);

    @GetMapping(value = APP_ROOT +"/event/locationEvent/{city}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findEventByLocation_City(@PathVariable("city") String city);

    @GetMapping(value = APP_ROOT +"/event/categoryEvent/{genre}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findEventByCategory_Genre(@PathVariable("genre") String genre);

    @GetMapping(value = APP_ROOT +"/event/catLocEvent/{genre}/{city}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findEventByCategory_GenreAndLocation_City(@PathVariable String genre, @PathVariable String city);

    @GetMapping(value = APP_ROOT +"/event/type/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findEventByType(@PathVariable("type") String type);

    @GetMapping(value = APP_ROOT +"/event/typegenre/{type}/{genre}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findEventByTypeAndCategory_Genre(@PathVariable String type, @PathVariable String genre);

    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/event/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    Optional<EventDTO> update (@PathVariable("id") Long id , @RequestBody EventDTO dto);

    @GetMapping(value = APP_ROOT +"/event/search/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findAllByEventNameLike(@PathVariable String name);

    @GetMapping(value = APP_ROOT +"/event/searchType/{type}/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<EventDTO> findAllByTypeAndEventNameLike(@PathVariable String type, @PathVariable String name);
}
