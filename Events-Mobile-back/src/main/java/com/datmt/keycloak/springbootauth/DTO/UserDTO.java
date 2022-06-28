package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.*;
import lombok.Builder;
import lombok.Data;
import java.util.List;



import java.util.Date;
import java.util.List;

@Data
@Builder
public class UserDTO {

    private String id;
    private String username;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    private Date CreatedDate;
    private Boolean Deleted = false;
    private Boolean HasEmail= true;
    private Boolean isEnabled=true;
    private String OrganisationsId;
    private String picture;
    private String PhoneNumber;
    private String Role;
    private String bio;
    private Boolean isAdmin;
    private Boolean isStaff;

    private Location location;
    private List<Event> events;


    private Staff staff;
//    private List<Email>emails;

       private List<Organisateur> organisateur;
    private List<Notifications> notifications;


    public static UserDTO fromEntity(User user){
        if(user == null){
            return null;
        }
        return UserDTO.builder().id(user.getId())
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .picture(user.getPicture())
                .CreatedDate(user.getCreatedDate())
                .location(user.getLocation())
                .events(user.getEvents())
                .staff(user.getStaff())
                .notifications(user.getNotifications())
//                .emails(user.getEmails())
                .organisateur(user.getOrganisateur())
                .bio(user.getBio())
                .isAdmin(user.getIsAdmin())
                .isStaff(user.getIsStaff())
                .build();
    }

    public static User toEntity(UserDTO userDTO){
        if(userDTO == null){
            return null;
        }

        User user = new User();
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setEmail(userDTO.getEmail());
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setCreatedDate(userDTO.getCreatedDate());
        user.setRole(userDTO.getRole());
        user.setLocation(userDTO.getLocation());
        user.setEvents(userDTO.getEvents());
        user.setStaff(userDTO.getStaff());
//        user.setEmails(userDTO.getEmails());
        user.setNotifications(userDTO.getNotifications());
        user.setOrganisateur(userDTO.getOrganisateur());
        user.setBio(userDTO.getBio());
        user.setIsAdmin(userDTO.getIsAdmin());
        user.setIsStaff(userDTO.getIsStaff());
        return user;
    }
}
