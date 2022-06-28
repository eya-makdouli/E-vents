package com.datmt.keycloak.springbootauth.controller.api;

import com.datmt.keycloak.springbootauth.DTO.NotificationsDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface NotificationApi {

    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/notification/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    NotificationsDTO save (@RequestBody NotificationsDTO notificationsDTO);

    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/notification/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    NotificationsDTO findById(@PathVariable("id") Long id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/user/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    Optional<NotificationsDTO> findNotificationsByUser_Id(@PathVariable("id") String id);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/event/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findNotificationsByEvent_Id(@PathVariable("id") Long id);



    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/event/{id}/{idEvent}/{solved}/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(@PathVariable String id,@PathVariable Long idEvent,@PathVariable Boolean solved,@PathVariable String type);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/accepted/{id}/{Event}/{accepted}/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(@PathVariable String id,@PathVariable Long Event,@PathVariable Boolean accepted,@PathVariable String type);

    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/notification/update/{id}" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    NotificationsDTO UpdateNotification (@PathVariable("id") Long id,@RequestBody NotificationsDTO notificationsDTO);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findAll();

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = APP_ROOT +"/notification/delete/{id}")
    void delete(@PathVariable("id") Long id);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/user/id/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findAllByUser_Id(@PathVariable String id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/org/id/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findAllByOrg_Id(@PathVariable String id);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/remider/{id}/{Event}/{orgId}", produces = MediaType.APPLICATION_JSON_VALUE)
    Integer findNotificationsByUser_IdAndEvent_IdAndOrg_Id(@PathVariable String id, @PathVariable Long Event, @PathVariable String orgId);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/organisateur/{id}/{idEvent}/{solved}/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findNotificationsByOrg_IdAndEvent_IdAndSolvedAndType(@PathVariable String id,@PathVariable Long idEvent,@PathVariable Boolean solved,@PathVariable String type);


    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/staff/{id}/{accepted}/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findNotificationsByOrg_IdAndAcceptedAndType(@PathVariable String id,@PathVariable Boolean accepted,@PathVariable String type);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/participant/{id}/{accepted}/{type}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findAllByUser_IdAndAcceptedAndType(@PathVariable String id,@PathVariable Boolean accepted,@PathVariable String type);

    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/notification/eventpart/{id}/{accepted}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<NotificationsDTO> findAllByEvent_IdAndAccepted(@PathVariable Long id,@PathVariable Boolean accepted);
}

