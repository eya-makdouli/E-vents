package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Category;
import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.Notifications;
import com.datmt.keycloak.springbootauth.Model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationsDTO {

    private Long id;
    private String action;
    private String type;
    private Boolean solved;
    private Boolean accepted;
    private Boolean refused;
    private User user;
    private Event event;
    private User org;
    private Boolean forAdmin = false;
    private Boolean notified;


    public static NotificationsDTO fromEntity(Notifications notifications){
        if(notifications == null){
            return null;
        }
        return NotificationsDTO.builder().id(notifications.getId())
                .action(notifications.getAction())
                .type(notifications.getType())
                .solved(notifications.getSolved())
                .user(notifications.getUser())
                .event(notifications.getEvent())
                .org(notifications.getOrg())
                .accepted(notifications.getAccepted())
                .refused(notifications.getRefused())
                .notified(notifications.getNotified())
                .forAdmin(notifications.getForAdmin())
                .build();
    }

    public static Notifications toEntity(NotificationsDTO notificationsDTO) {
        if (notificationsDTO == null) {
            return null;
        }
        Notifications notifications = new Notifications();
        notifications.setId(notificationsDTO.getId());
        notifications.setAction(notificationsDTO.getAction());
        notifications.setType(notificationsDTO.getType());
        notifications.setSolved(notificationsDTO.getSolved());
        notifications.setEvent(notificationsDTO.getEvent());
        notifications.setUser(notificationsDTO.getUser());
        notifications.setOrg(notificationsDTO.getOrg());
        notifications.setAccepted(notificationsDTO.getAccepted());
        notifications.setRefused(notificationsDTO.getRefused());
        notifications.setNotified(notificationsDTO.getNotified());
        notifications.setForAdmin(notificationsDTO.getForAdmin());
        return notifications;
    }

}

