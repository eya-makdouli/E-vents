package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.StaffRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffRequestRepository extends JpaRepository<StaffRequest, Long> {
    Optional<StaffRequest> findStaffRequestByUser_Id(String id);
}
