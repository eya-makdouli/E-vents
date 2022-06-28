package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.controller.api.LocationApi;
import com.datmt.keycloak.springbootauth.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LocationController implements LocationApi {

    private final LocationService locationService;
    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }



    @Override
    public LocationDTO save(LocationDTO dto) {
        return locationService.save(dto);
    }

    @Override
    public LocationDTO findById(Long id) {
        return locationService.findById(id);
    }

    @Override
    public LocationDTO findLocationByCity(String city) {
        return locationService.findLocationByCity(city);
    }

    @Override
    public LocationDTO findLocationByCountry(String county) {
        return locationService.findLocationByCountry(county);
    }

    @Override
    public LocationDTO findLocationByZipCode(String zipcode) {
        return locationService.findLocationByZipCode(zipcode);
    }

    @Override
    public LocationDTO findLocationByName(String name) {
        return locationService.findLocationByName(name);
    }

    @Override
    public LocationDTO findLocationByRegion(String region) {
        return locationService.findLocationByRegion(region);
    }

    @Override
    public List<LocationDTO> findAll() {
        return locationService.findAll();
    }

    @Override
    public void delete(Long id) {
        locationService.delete(id);
    }

    @Override
    public List<LocationDTO> findAllByCityLike(String citylike) {
        return locationService.findAllByCityLike("%"+citylike+"%");
    }

    @Override
    public void deleteAllByCity(String city) {
        locationService.deleteAllByCity(city);
    }


}
