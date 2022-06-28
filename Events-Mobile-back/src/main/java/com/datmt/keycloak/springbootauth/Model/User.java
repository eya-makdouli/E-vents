package com.datmt.keycloak.springbootauth.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class User {
    @Id

    private String id;
    private String username;
    private String password;
    private String email;
    private String firstname;
    private String lastname;
    private Date CreatedDate;
    private Boolean Deleted = false;
    private Boolean HasEmail = false;
    private Boolean isEnabled = true;
    private String picture;
    private String PhoneNumber;
    private String Role;
    private String bio;
    private Boolean isStaff= false;
    @OneToMany
    private List<Event> events;

    @ManyToMany
    @JsonIgnore
    private List<Organisateur> organisateur;

    @ManyToOne
    private Location location;

    @OneToOne
    private Staff staff;


    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Notifications> notifications;

//    @ManyToMany
//    @JoinTable( name = "T_Users_Email",
//            joinColumns = @JoinColumn( name = "idUser" ),
//            inverseJoinColumns = @JoinColumn( name = "idEmail" ) )
//  private List<Email> emails = new ArrayList<>();
    private Boolean isAdmin;
}
