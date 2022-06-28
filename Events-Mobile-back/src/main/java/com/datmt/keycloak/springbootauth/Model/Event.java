package com.datmt.keycloak.springbootauth.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.jboss.resteasy.spi.touri.MappedBy;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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

    private String backgroundImage;

    private String link;


    private Boolean canceled;

    private String video;

    private Boolean isPrivate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Location location;

    @ManyToOne
    @JsonIgnore
    private Organisateur organisateur ;
    @ManyToOne
    private Category category;

    @OneToMany(mappedBy = "event")
    private List<Notifications> notifications;

//    @OneToMany
//    private List<Email> emails;

    @ManyToMany
    private List<Staff> staffs;

}