package com.datmt.keycloak.springbootauth.Model;

import lombok.*;
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

public class StaffJob {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String nameService;
    private Double price;
    @OneToMany
    private List<Staff> staffs;
    @ManyToMany
    private List<Category> categories;
}
