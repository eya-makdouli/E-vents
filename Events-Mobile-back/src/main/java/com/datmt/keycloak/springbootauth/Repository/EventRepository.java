package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.DTO.EventDTO;
import com.datmt.keycloak.springbootauth.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findEventByLocation_City (String city);
    List<Event> findEventByCategory_Genre (String genre);
    List<Event> findEventByCategory_GenreAndLocation_City (String genre, String city);
    List<Event> findEventByType (String type);
    List<Event> findEventByTypeAndCategory_Genre(String type, String genre);
    Optional<Event> findEventByEventName(String name);
    Optional<Event> findEventByCreatedDate(Date createdDate);
    List<Event> findAllByEventNameLike(String name);
    List<Event> findAllByTypeAndEventNameLike(String type, String name);
}
