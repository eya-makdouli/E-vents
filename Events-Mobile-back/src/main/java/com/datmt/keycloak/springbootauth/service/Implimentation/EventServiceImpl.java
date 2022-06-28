package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.EventDTO;
import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.Location;
import com.datmt.keycloak.springbootauth.Repository.EventRepository;
import com.datmt.keycloak.springbootauth.service.EventService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@Log4j2
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;

    @Autowired
    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public EventDTO save(EventDTO eventDTO) {
        return EventDTO.fromEntity(eventRepository.save(EventDTO.toEntity(eventDTO)));
    }

    @Override
    public EventDTO findById(Long id) {
        Optional<Event> event = eventRepository.findById(id);
        EventDTO dto = EventDTO.fromEntity(event.get());
        return dto;
    }

    @Override
    public EventDTO findEventByEventName(String name) {
        Optional<Event> event = eventRepository.findEventByEventName(name);
        EventDTO dto = EventDTO.fromEntity(event.get());
        return dto;
    }

    @Override
    public List<EventDTO> findAll() {
        return eventRepository.findAll().stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public EventDTO findEventByCreatedDate(Date createdDate) {
        Optional<Event> event = eventRepository.findEventByCreatedDate(createdDate);
        EventDTO dto = EventDTO.fromEntity(event.get());
        return dto;
    }

    @Override
    public List<EventDTO> findEventByType(String type) {
        return eventRepository.findEventByType(type).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> findEventByTypeAndCategory_Genre(String type, String genre) {
        return eventRepository.findEventByTypeAndCategory_Genre(type, genre).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public List<EventDTO> findEventByLocation_City(String city) {
        return eventRepository.findEventByLocation_City(city).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> findEventByCategory_Genre(String genre) {
        return eventRepository.findEventByCategory_Genre(genre).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> findEventByCategory_GenreAndLocation_City(String genre, String city) {
        return eventRepository.findEventByCategory_GenreAndLocation_City(genre, city).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<EventDTO> update(Long id, EventDTO dto) {
        return eventRepository.findById(id).map(event -> {
            event.setEventName(dto.getEventName());
            event.setCategory(dto.getCategory());
            event.setLocation(dto.getLocation());
            event.setType(dto.getType());
            event.setPicture(dto.getPicture());
            event.setDescription(dto.getDescription());
            event.setCreatedDate(dto.getCreatedDate());
            event.setEndDate(dto.getEndDate());
            event.setUser(dto.getUser());
            event.setOrganisateur(dto.getOrganisateur());
            event.setId(dto.getId());
            event.setCanceled(dto.getCanceled());
//            event.setEmails(dto.getEmails());
            event.setStartDate(dto.getStartDate());
            event.setFinished(dto.getFinished());
            event.setStarted(dto.getStarted());
            event.setReported(dto.getReported());
            event.setLink(dto.getLink());
            event.setVideo(dto.getVideo());
            eventRepository.save(event);
            EventDTO eventDTO = EventDTO.fromEntity(event);
            return eventDTO;
        });
    }

    @Override
    public List<EventDTO> findAllByEventNameLike(String name) {
        return eventRepository.findAllByEventNameLike(name).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventDTO> findAllByTypeAndEventNameLike(String type, String name) {
        return eventRepository.findAllByTypeAndEventNameLike(type , name).stream().map(EventDTO::fromEntity)
                .collect(Collectors.toList());
    }

}
