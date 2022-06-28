package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.LocationDTO;

import javax.transaction.Transactional;
import java.util.List;
@Transactional
public interface LocationService {
        LocationDTO save (LocationDTO locationDTO);

        LocationDTO findById(Long idLocation);

        LocationDTO findLocationByCity(String City);

        LocationDTO findLocationByCountry(String county);
        LocationDTO findLocationByName(String name);
        LocationDTO findLocationByZipCode(String zipcode);

        LocationDTO findLocationByRegion (String region);

        List<LocationDTO> findAll();

        void delete(Long idLocation);
        List<LocationDTO> findAllByCityLike(String citylike);
        void deleteAllByCity(String city);

}


