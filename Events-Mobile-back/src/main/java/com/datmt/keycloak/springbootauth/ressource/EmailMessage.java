package com.datmt.keycloak.springbootauth.ressource;

public class EmailMessage {
    private String toward;
    private String subject;
    private String message;
public EmailMessage(){

}
    public EmailMessage(String toward, String subject, String message) {
        this.toward = toward;
        this.subject = subject;
        this.message = message;
    }

    public String getToward() {
        return toward;
    }

    public void setToward(String toward) {
        this.toward = toward;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
