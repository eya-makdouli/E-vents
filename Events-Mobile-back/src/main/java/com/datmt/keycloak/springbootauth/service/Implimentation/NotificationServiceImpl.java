package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.NotificationsDTO;
import com.datmt.keycloak.springbootauth.Model.Notifications;
import com.datmt.keycloak.springbootauth.Repository.NotificationsRepository;
import com.datmt.keycloak.springbootauth.service.NotificationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class NotificationServiceImpl implements NotificationService {

    private NotificationsRepository notificationsRepository;
    @Autowired
    public NotificationServiceImpl(NotificationsRepository notificationsRepository) {
    this.notificationsRepository = notificationsRepository;
    }


    @Override
    public NotificationsDTO save(NotificationsDTO notificationsDTO) {
        return NotificationsDTO.fromEntity(
                notificationsRepository.save(NotificationsDTO.toEntity(notificationsDTO)));
    }
    @Override
    public NotificationsDTO findById(Long id) {
        Optional<Notifications> notifications = notificationsRepository.findById(id);
        NotificationsDTO dto = NotificationsDTO.fromEntity(notifications.get());
        return dto;
    }

    @Override
    public Optional<NotificationsDTO> findNotificationsByUser_Id(String id) {
        Optional<Notifications> notifications = notificationsRepository.findNotificationsByUser_Id(id);
        NotificationsDTO dto = NotificationsDTO.fromEntity(notifications.get());
        return Optional.ofNullable(dto);
    }

    @Override
    public List<NotificationsDTO> findNotificationsByEvent_Id(Long id) {
        Optional<Notifications> notifications = notificationsRepository.findNotificationsByEvent_Id(id);
        NotificationsDTO dto = NotificationsDTO.fromEntity(notifications.get());
        return (List<NotificationsDTO>) dto;
    }

    @Override
    public NotificationsDTO updateNotification(Long id, NotificationsDTO notificationsDTO) {
        Notifications notifications = notificationsRepository.findById(id).get();
        notifications.setAction(notificationsDTO.getAction());
        notifications.setType(notificationsDTO.getType());
        notifications.setSolved(notificationsDTO.getSolved());
        notifications.setUser(notificationsDTO.getUser());
        notifications.setEvent(notificationsDTO.getEvent());
        notifications.setRefused(notificationsDTO.getRefused());
        notifications.setAccepted(notificationsDTO.getAccepted());
        notifications.setOrg(notificationsDTO.getOrg());
        notifications.setNotified(notificationsDTO.getNotified());
        notificationsRepository.save(notifications);

        return NotificationsDTO.fromEntity(notifications);
    }

    @Override
    public List<NotificationsDTO> findAll() {
        return notificationsRepository.findAll().stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public NotificationsDTO findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(String id, Long idEvent, Boolean solved, String type) {
        Optional<Notifications> notifications = notificationsRepository.findNotificationsByUser_IdAndEvent_IdAndSolvedAndType(id, idEvent ,solved, type);
        NotificationsDTO dto = NotificationsDTO.fromEntity(notifications.get());
        return dto;
    }

    @Override
    public NotificationsDTO findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(String id, Long Event, Boolean accepted, String type) {
        Optional<Notifications> notifications = notificationsRepository.findNotificationsByUser_IdAndEvent_IdAndAcceptedAndType(id, Event ,accepted, type);
        NotificationsDTO dto = NotificationsDTO.fromEntity(notifications.get());
        return dto;
    }

    @Override
    public void delete(Long id) {
        notificationsRepository.deleteById(id);
    }

    @Override
    public List<NotificationsDTO> findAllByUser_Id(String id) {
        return notificationsRepository.findAllByUser_Id(id).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationsDTO> findAllByOrg_Id(String id) {
        return notificationsRepository.findAllByOrg_Id(id).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public Integer findNotificationsByUser_IdAndEvent_IdAndOrg_Id(String id, Long Event, String orgId) {

        return notificationsRepository.countNotificationsByUser_IdAndEvent_IdAndOrg_Id(id,Event,orgId);
    }

    @Override
    public List<NotificationsDTO> findAllByOrg_idAndEvent_IdAndSolvedAndType(String id, Long idEvent, Boolean solved, String type) {
        return notificationsRepository.findAllByOrg_idAndEvent_IdAndSolvedAndType(id,idEvent,solved,type).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationsDTO> findAllByUser_IdAndAcceptedAndType(String id, Boolean accepted, String type) {
        return notificationsRepository.findAllByUser_IdAndAcceptedAndType(id,accepted,type).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationsDTO> findAllByEvent_IdAndAccepted(Long id, Boolean accepted) {
        return notificationsRepository.findAllByEvent_IdAndAccepted(id,accepted).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationsDTO> findAllByOrg_idAndAcceptedAndType(String id, Boolean accepted, String type) {
        return notificationsRepository.findAllByOrg_idAndAcceptedAndType(id,accepted,type).stream()
                .map(NotificationsDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
