package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface LocationRepository extends JpaRepository<Location , Long> {

    Optional<Location> findLocationByCity(String city);
    Optional<Location> findLocationByCountry(String county);
    Optional<Location> findLocationByName(String name);
    Optional<Location> findLocationByZipCode(String zipcode);
    Optional<Location> findLocationByRegion(String region);
    Set<Location> findAllByCityLike(String citylike);
    void deleteAllByCity(String city);
}
