package com.datmt.keycloak.springbootauth.Model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private Long id;
    private String country ;
    private String city ;
    private String region ;
    private String zipCode;
    private String name;
    private String longitude;
    private String latitude;
        @OneToMany
        private List<User> users;
        @OneToMany
        private List<Event> events;
}
