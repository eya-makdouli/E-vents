package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.Model.Location;
import com.datmt.keycloak.springbootauth.Repository.LocationRepository;
import com.datmt.keycloak.springbootauth.service.LocationService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@Transactional
public class LocationServiceImpl implements LocationService  {
    private LocationRepository locationRepository ;
    @Autowired
    public LocationServiceImpl (LocationRepository locationRepository){
        this.locationRepository = locationRepository;
    }


    @Override
    public LocationDTO save(LocationDTO locationDTO) {
        return LocationDTO.fromEntity(locationRepository.save(LocationDTO.toEntity(locationDTO)));
    }

    @Override
    public LocationDTO findById(Long idLocation) {
        Optional<Location> location = locationRepository.findById(idLocation);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public LocationDTO findLocationByCity(String City) {
        Optional<Location> location = locationRepository.findLocationByCity(City);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public LocationDTO findLocationByCountry(String county) {
        Optional<Location> location = locationRepository.findLocationByCountry(county);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public LocationDTO findLocationByName(String name) {
        Optional<Location> location = locationRepository.findLocationByName(name);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public LocationDTO findLocationByZipCode(String zipcode) {
        Optional<Location> location = locationRepository.findLocationByZipCode(zipcode);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public LocationDTO findLocationByRegion(String region) {
        Optional<Location> location = locationRepository.findLocationByRegion(region);
        LocationDTO dto = LocationDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public List<LocationDTO> findAll() {
        return locationRepository.findAll().stream().map(LocationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long idLocation) {
        locationRepository.deleteById(idLocation);
    }

    @Override
    public List<LocationDTO> findAllByCityLike(String citylike) {
        return locationRepository.findAllByCityLike(citylike).stream().map(LocationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteAllByCity(String city) {
        locationRepository.deleteAllByCity(city);
    }
}

