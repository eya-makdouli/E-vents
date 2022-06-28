package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.Location;
import com.datmt.keycloak.springbootauth.Model.User;
import lombok.Builder;
import lombok.Data;

import javax.transaction.Transactional;
import java.util.List;
@Data
@Builder
@Transactional
public class LocationDTO {
    private Long id;
    private String country ;
    private String City ;
    private String region ;
    private String zipCode;
    private String name;
    private String longitude;
    private String latitude;
    private List<User> users;
    private List<Event> events;


    public static LocationDTO fromEntity(Location location){
        if(location == null){
            return null;
        }
        return LocationDTO.builder().id(location.getId())
                .country(location.getCountry())
                .region(location.getRegion())
                .City(location.getCity())
                .zipCode(location.getZipCode())
                .name(location.getName())
                .longitude(location.getLongitude())
                .latitude(location.getLatitude())
                .users(location.getUsers())
                .events(location.getEvents())
                .build();
    }

    public static Location toEntity(LocationDTO locationDTO) {
        if (locationDTO == null) {
            return null;
        }
        Location location = new Location();
        location.setCountry(locationDTO.getCountry());
        location.setRegion(locationDTO.getRegion());
        location.setCity(locationDTO.getCity());
        location.setZipCode(locationDTO.getZipCode());
        location.setName(locationDTO.getName());
        location.setLongitude(locationDTO.getLongitude());
        location.setLatitude(locationDTO.getLatitude());
        location.setUsers(locationDTO.getUsers());
        location.setEvents(locationDTO.getEvents());
        return location;
    }

}
