//package com.datmt.keycloak.springbootauth.DTO;
//import com.datmt.keycloak.springbootauth.Model.Email;
//import com.datmt.keycloak.springbootauth.Model.Event;
//import com.datmt.keycloak.springbootauth.Model.User;
//import lombok.Builder;
//import lombok.Data;
//
//import java.util.List;
//
//@Data
//@Builder
//public class EmailDTO {
//    private Long id;
//    private String toward;
//    private String subject;
//    private String message ;
//    private Event event  ;
//    private List<User> users;
//
//    public static EmailDTO fromEntity(Email email){
//        if(email == null){
//            return null;
//        }
//        return EmailDTO.builder().id(email.getId())
//                .toward(email.getToward())
//                .subject(email.getSubject())
//                .message(email.getMessage())
//                .event(email.getEvent())
//                .users(email.getUsers())
//                .build();
//    }
//
//    public static Email toEntity(EmailDTO emailDTO) {
//        if (emailDTO == null) {
//            return null;
//        }
//        Email email = new Email();
//        email.setId(emailDTO.getId());
//        email.setToward(emailDTO.getToward());
//        email.setSubject(emailDTO.getSubject());
//        email.setMessage(emailDTO.getMessage());
//        email.setEvent(emailDTO.getEvent());
//        email.setUsers(emailDTO.getUsers());
//
//        return email;
//    }
//
//
//}