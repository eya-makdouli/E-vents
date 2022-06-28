//package com.datmt.keycloak.springbootauth.Model;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table
//public class Email {
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    private Long id;
//    private String toward;
//    private String subject;
//    private String message ;
//
//
//
//
//    @ManyToMany
//    @JoinTable( name = "T_Users_Email",
//            joinColumns = @JoinColumn( name = "idEmail" ),
//            inverseJoinColumns = @JoinColumn( name = "idUser" ) )
//    private List<User> users = new ArrayList<>();
//
//    @ManyToOne
//    private Event event  ;
//}