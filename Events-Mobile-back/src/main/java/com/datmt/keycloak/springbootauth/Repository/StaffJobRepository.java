package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.StaffJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffJobRepository extends JpaRepository<StaffJob, Long> {
}
