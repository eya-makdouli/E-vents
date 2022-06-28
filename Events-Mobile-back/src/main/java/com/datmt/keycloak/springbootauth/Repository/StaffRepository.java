package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface StaffRepository extends JpaRepository<Staff , Long> {
    List<Staff> findAllByStaffJob_Id(Long id);
}