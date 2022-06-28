package com.datmt.keycloak.springbootauth.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table

public class Notifications {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String action;
    private String type;
    private Boolean solved= false;
    private Boolean accepted = false;
    private Boolean refused= false;
    private Boolean notified = false;
    private Boolean forAdmin = false;

    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    private Event event;

    @ManyToOne
    @JsonIgnore
    private User org;


}