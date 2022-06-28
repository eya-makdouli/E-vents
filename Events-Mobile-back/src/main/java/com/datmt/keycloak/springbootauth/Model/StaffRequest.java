package com.datmt.keycloak.springbootauth.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class StaffRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private User user;
    @ManyToOne
    private StaffJob staffJob;
    private String image1;
    private String image2;
    private String image3;
    private Boolean solved;
    private Boolean accepted;
    private Boolean refused;
    private String apropos;
}
