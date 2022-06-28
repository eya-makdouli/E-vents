package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.RecruitmentRequest;
import com.datmt.keycloak.springbootauth.Model.StaffRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface RecruitmentRequestRepository extends JpaRepository<RecruitmentRequest , Long> {
    List<RecruitmentRequest> findAllByUser_Id(String id);
    List<RecruitmentRequest> findAllByOrg_IdAndAcceptedAndEvent_Id(String id, Boolean accepted , Long event_id);
    List<RecruitmentRequest> findAllByAcceptedAndEvent_Id(Boolean accepted , Long event);
}
