package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.NotificationsDTO;
import com.datmt.keycloak.springbootauth.Model.Notifications;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    NotificationsDTO save (NotificationsDTO notificationsDTO);

    NotificationsDTO findById(Long id);

    Optional<NotificationsDTO> findNotificationsByUser_Id(String id);

    List<NotificationsDTO> findNotificationsByEvent_Id(Long id);

    NotificationsDTO updateNotification(Long id,NotificationsDTO notificationsDTO);

    List<NotificationsDTO> findAll();

    NotificationsDTO findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(String id , Long idEvent, Boolean solved, String type);
   NotificationsDTO findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(String id , Long Event, Boolean accepted, String type);
    void delete(Long id);

    List<NotificationsDTO> findAllByUser_Id(String id);
    List<NotificationsDTO> findAllByOrg_Id(String id);

    Integer findNotificationsByUser_IdAndEvent_IdAndOrg_Id(String id , Long Event , String orgId);

    List<NotificationsDTO> findAllByOrg_idAndEvent_IdAndSolvedAndType(String id , Long idEvent, Boolean solved, String type);

    List<NotificationsDTO> findAllByUser_IdAndAcceptedAndType(String id, Boolean accepted , String type);

    List<NotificationsDTO> findAllByEvent_IdAndAccepted(Long id, Boolean accepted);

    List<NotificationsDTO> findAllByOrg_idAndAcceptedAndType(String id , Boolean accepted, String type);

}
