package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.*;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class EventDTO {
    private Long id;


    private String eventName;


    private String description;


    private Date createdDate;


    private Date startDate;


    private Date endDate;


    private String type;


    private Boolean started;


    private Boolean finished;


    private String picture;


    private Boolean deleted;


    private Boolean reported;


    private Boolean canceled;

    private String backgroundImage;
    private String link;
    private String video;


    private User user;
    private Location location;

    private Boolean isPrivate;

    private Category category;
//    private List<Email> emails;
    private Organisateur organisateur ;
    private List<Notifications> notifications;
    private List<Staff> staffs;

    public static EventDTO fromEntity(Event event){
        if(event == null){
            return null;
        }
        return EventDTO.builder()
                .id(event.getId())
                .eventName(event.getEventName())
                .description(event.getDescription())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .type(event.getType())
                .picture(event.getPicture())
                .createdDate(event.getCreatedDate())
                .user(event.getUser())
                .location(event.getLocation())
                .category(event.getCategory())
//                .emails(event.getEmails())
                .organisateur(event.getOrganisateur())
                .backgroundImage(event.getBackgroundImage())
                .notifications(event.getNotifications())
                .link(event.getLink())
                .staffs(event.getStaffs())
                .video(event.getVideo())
                .isPrivate(event.getIsPrivate())
                .build();
    }

    public static Event toEntity(EventDTO dto) {
        if (dto == null) {
            return null;
        }
        Event event = new Event();
        event.setId(dto.getId());
        event.setEventName(dto.getEventName());
        event.setDescription(dto.getDescription());
        event.setStartDate(dto.getStartDate());
        event.setEndDate(dto.getEndDate());
        event.setType(dto.getType());
        event.setPicture(dto.getPicture());
        event.setCreatedDate(dto.getCreatedDate());
        event.setUser(dto.getUser());
        event.setLocation(dto.getLocation());
        event.setCategory(dto.getCategory());
//      event.setEmails(dto.getEmails());
        event.setOrganisateur(dto.getOrganisateur());
        event.setBackgroundImage(dto.getBackgroundImage());
        event.setNotifications(dto.getNotifications());
        event.setLink(dto.getLink());
        event.setVideo(dto.getVideo());
        event.setStaffs(dto.getStaffs());
        event.setIsPrivate(dto.getIsPrivate());


        return event;
    }



}