package com.datmt.keycloak.springbootauth.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table

    public class Staff {
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        private Long id;

        @OneToOne
        @JsonIgnore
        private User user;

        private Boolean available;

        @ManyToMany
        private List<Event> events ;

        @ManyToOne
        private StaffJob staffJob;
    }
