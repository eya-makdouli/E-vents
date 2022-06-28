package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.NotificationsDTO;
import com.datmt.keycloak.springbootauth.controller.api.NotificationApi;
import com.datmt.keycloak.springbootauth.service.NotificationService;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class NotificationsController implements NotificationApi {
    private NotificationService notificationService;

    public NotificationsController(NotificationService notificationService) {
    this.notificationService= notificationService;
    }

    @Override
    public NotificationsDTO save(NotificationsDTO notificationsDTO) {
        return notificationService.save(notificationsDTO);
    }

    @Override
    public NotificationsDTO findById(Long id) {
        return notificationService.findById(id);
    }

    @Override
    public Optional<NotificationsDTO> findNotificationsByUser_Id(String id) {
        return notificationService.findNotificationsByUser_Id(id);
    }

    @Override
    public List<NotificationsDTO> findNotificationsByEvent_Id(Long id) {
        return notificationService.findNotificationsByEvent_Id(id);
    }

    @Override
    public List<NotificationsDTO> findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(String id, Long idEvent, Boolean solved, String type) {
        return Collections.singletonList(notificationService.findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(id, idEvent, solved,type));
    }

    @Override
    public List<NotificationsDTO> findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(String id, Long Event, Boolean accepted, String type) {
        return Collections.singletonList(notificationService.findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(id, Event, accepted, type));
    }

    @Override
    public NotificationsDTO UpdateNotification(Long id, NotificationsDTO notificationsDTO) {
        return notificationService.updateNotification(id, notificationsDTO);
    }

    @Override
    public List<NotificationsDTO> findAll() {
        return notificationService.findAll();
    }

    @Override
    public void delete(Long id) {
        notificationService.delete(id);
    }

    @Override
    public List<NotificationsDTO> findAllByUser_Id(String id) {
        return notificationService.findAllByUser_Id(id);
    }

    @Override
    public List<NotificationsDTO> findAllByOrg_Id(String id) {
        return notificationService.findAllByOrg_Id(id);
    }

    @Override
    public Integer findNotificationsByUser_IdAndEvent_IdAndOrg_Id(String id, Long Event, String orgId) {
        return notificationService.findNotificationsByUser_IdAndEvent_IdAndOrg_Id(id,Event,orgId);
    }

    @Override
    public List<NotificationsDTO> findNotificationsByOrg_IdAndEvent_IdAndSolvedAndType(String id, Long idEvent, Boolean solved, String type) {
        return notificationService.findAllByOrg_idAndEvent_IdAndSolvedAndType(id,idEvent,solved,type);
    }

    @Override
    public List<NotificationsDTO> findNotificationsByOrg_IdAndAcceptedAndType(String id, Boolean accepted, String type) {
        return notificationService.findAllByOrg_idAndAcceptedAndType(id , accepted , type);
    }

    @Override
    public List<NotificationsDTO> findAllByUser_IdAndAcceptedAndType(String id, Boolean accepted, String type) {
        return notificationService.findAllByUser_IdAndAcceptedAndType(id, accepted,type);
    }

    @Override
    public List<NotificationsDTO> findAllByEvent_IdAndAccepted(Long id, Boolean accepted) {
        return notificationService.findAllByEvent_IdAndAccepted(id,accepted);
    }
}
