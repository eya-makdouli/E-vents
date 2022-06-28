package com.datmt.keycloak.springbootauth.Model;


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

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String genre;
    private String icon;
    @OneToMany
    private List<Event> events;
    @ManyToMany
    private List<StaffJob> staffJobs;
}
