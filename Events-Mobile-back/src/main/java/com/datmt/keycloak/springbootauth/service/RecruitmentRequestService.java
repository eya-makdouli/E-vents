package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.RecruitmentRequestDTO;
import com.datmt.keycloak.springbootauth.Model.RecruitmentRequest;

import java.util.List;

public interface RecruitmentRequestService {
    RecruitmentRequestDTO save (RecruitmentRequestDTO recruitmentRequestDTO);

    RecruitmentRequestDTO update (RecruitmentRequestDTO recruitmentRequestDTO, Long id);

    List<RecruitmentRequestDTO> findRecruitmentRequestByUser_Id(String id);

    RecruitmentRequestDTO findById(Long id);

    List<RecruitmentRequestDTO> findAll();

    List<RecruitmentRequestDTO> findAllByOrg_IdAndAcceptedAndEvent_Id(String id, Boolean accepted , Long event_id);

    List<RecruitmentRequestDTO> findAllByAcceptedAndEvent_Id(Boolean accepted , Long event);

    void delete(Long id);

}
