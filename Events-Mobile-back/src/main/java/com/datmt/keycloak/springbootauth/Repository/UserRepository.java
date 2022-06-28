package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);
    List<User> findAllByFirstnameLike(String firstname);
    List<User> findAllByIsStaff(Boolean isStaff);

}
