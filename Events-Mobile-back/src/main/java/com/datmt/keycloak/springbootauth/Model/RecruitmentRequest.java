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
public class RecruitmentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    private User user;
    @OneToOne
    private User org ;
    @OneToOne
    private StaffJob staffJob;
    @OneToOne
    private Event event;
    private String need1;
    private String need2;
    private Integer price;
    private Boolean solved;
    private Boolean accepted;
    private Boolean refused;
}
