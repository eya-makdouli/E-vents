package com.datmt.keycloak.springbootauth.Exceptions;


public enum ErrorCodes {
    USER_NOT_FOUND(1000),
    USER_NOT_VALID(1001),
    CATEGORY_NOT_FOUND(2000),
    CATEGORY_NOT_VALID(2001),
    LOCATION_NOT_FOUND(3000),
    LOCATION_NOT_VALID(3001),
    EVENT_NOT_FOUND(4000),
    EVENT_NOT_VALID(4001),
    STAFF_NOT_FOUND(5000),
    STAFF_NOT_VALID(5001),
    SERVICESTAFF_NOT_FOUND(6000),
    SERVICESTAFF_NOT_VALID(6001),
    ORGANISATEUR_NOT_FOUND(7000),
    ORGANISATEUR_NOT_VALID(7001);

    private int id;

    ErrorCodes(int id){
        this.id = id;
    }
    public int getId(){
        return id;
    }
}
