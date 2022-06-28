//package com.datmt.keycloak.springbootauth.service.Implimentation;
//
//import com.datmt.keycloak.springbootauth.service.EmailSenderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailSenderServiceImpl implements EmailSenderService {
//    private final JavaMailSender mailSender;
//
//    @Autowired
//    public EmailSenderServiceImpl(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//
//
//    @Override
//    public void sendEmail(String toward, String subject, String message) {
//        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
//        simpleMailMessage.setFrom("eventse105@gmail.com ");
//        simpleMailMessage.setTo(toward);
//        simpleMailMessage.setSubject(subject);
//        simpleMailMessage.setText(message);
//        this.mailSender.send(simpleMailMessage);
//
//
//
//    }
//}
