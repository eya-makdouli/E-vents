//package com.datmt.keycloak.springbootauth.controller;
//
//import com.datmt.keycloak.springbootauth.ressource.EmailMessage;
//import com.datmt.keycloak.springbootauth.service.EmailSenderService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//
//public class EmailController {
//    private final EmailSenderService emailSenderService;
//
//    public EmailController(EmailSenderService emailSenderService) {
//        this.emailSenderService = emailSenderService;
//    }
//
//
//    @PostMapping("/sendEmail")
//    public ResponseEntity sendEmail(@RequestBody EmailMessage emailMessage){
// this.emailSenderService.sendEmail(emailMessage.getToward(),emailMessage.getSubject(),emailMessage.getMessage());
// return ResponseEntity.ok("Success");
//    }
//}
