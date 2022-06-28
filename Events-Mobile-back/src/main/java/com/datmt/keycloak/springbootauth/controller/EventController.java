package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.EventDTO;
import com.datmt.keycloak.springbootauth.controller.api.EventApi;
import com.datmt.keycloak.springbootauth.service.EventService;
import com.datmt.keycloak.springbootauth.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class EventController implements EventApi {
    private final EventService eventService;
    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @Override
    public EventDTO save(EventDTO dto) {
        return eventService.save(dto);
    }

    @Override
    public EventDTO findById(Long id) {
        return eventService.findById(id);
    }

    @Override
    public EventDTO findEventByEventName(String name) {
        return eventService.findEventByEventName(name);
    }

    @Override
    public EventDTO findEventByCreatedDate(Date createdDate) {
        return eventService.findEventByCreatedDate(createdDate);
    }

    @Override
    public List<EventDTO> findAll() {
        return eventService.findAll();
    }

    @Override
    public void delete(Long id) {
        eventService.delete(id);
    }

    @Override
    public List<EventDTO> findEventByLocation_City(String city) {
        return eventService.findEventByLocation_City(city);
    }

    @Override
    public List<EventDTO> findEventByCategory_Genre(String genre) {
        return eventService.findEventByCategory_Genre(genre);
    }

    @Override
    public List<EventDTO> findEventByCategory_GenreAndLocation_City(String genre, String city) {
        return eventService.findEventByCategory_GenreAndLocation_City(genre,city);
    }

    @Override
    public List<EventDTO> findEventByType(String type) {
        return eventService.findEventByType(type);
    }

    @Override
    public List<EventDTO> findEventByTypeAndCategory_Genre(String type, String genre) {
        return eventService.findEventByTypeAndCategory_Genre(type, genre);
    }

    @Override
    public Optional<EventDTO> update(Long id, EventDTO dto) {
        return eventService.update(id, dto);
    }

    @Override
    public List<EventDTO> findAllByEventNameLike(String name) {
        return eventService.findAllByEventNameLike('%'+name+'%');
    }

    @Override
    public List<EventDTO> findAllByTypeAndEventNameLike(String type, String name) {
        return eventService.findAllByTypeAndEventNameLike(type, '%'+name+'%');
    }
}
