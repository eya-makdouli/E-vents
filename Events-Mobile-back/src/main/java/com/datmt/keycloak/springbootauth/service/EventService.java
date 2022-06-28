package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.EventDTO;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Model.Event;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventService {
    EventDTO save (EventDTO eventDTO);

    EventDTO findById(Long id);

    EventDTO findEventByEventName(String name);

    List<EventDTO> findAll();

    EventDTO findEventByCreatedDate(Date createdDate);


    List<EventDTO> findEventByType(String type);
    List<EventDTO> findEventByTypeAndCategory_Genre(String type, String genre);


    void delete(Long id);

    List<EventDTO> findEventByLocation_City (String city);
    List<EventDTO> findEventByCategory_Genre (String genre);
    List<EventDTO> findEventByCategory_GenreAndLocation_City (String genre, String city);

    Optional<EventDTO> update (Long id , EventDTO dto);

    List<EventDTO> findAllByEventNameLike(String name);
    List<EventDTO> findAllByTypeAndEventNameLike(String type, String name);
}
