package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.RecruitmentRequestDTO;
import com.datmt.keycloak.springbootauth.controller.api.RecruitmentRequestApi;
import com.datmt.keycloak.springbootauth.service.RecruitmentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class RecruitmentRequestController implements RecruitmentRequestApi {
    private RecruitmentRequestService recruitmentRequestService;
    @Autowired
    public RecruitmentRequestController(RecruitmentRequestService recruitmentRequestService) {
        this.recruitmentRequestService = recruitmentRequestService;
    }


    @Override
    public RecruitmentRequestDTO save(RecruitmentRequestDTO recruitmentRequestDTO) {
        return recruitmentRequestService.save(recruitmentRequestDTO);
    }

    @Override
    public RecruitmentRequestDTO findById(Long id) {
        return recruitmentRequestService.findById(id);
    }

    @Override
    public List<RecruitmentRequestDTO> findAll() {
        return recruitmentRequestService.findAll();
    }

    @Override
    public void delete(Long id) {
    recruitmentRequestService.delete(id);
    }

    @Override
    public RecruitmentRequestDTO update(RecruitmentRequestDTO recruitmentRequestDTO, Long id) {
        return recruitmentRequestService.update(recruitmentRequestDTO, id);
    }

    @Override
    public List<RecruitmentRequestDTO> findStaffRequestByUser_Id(String id) {
        return recruitmentRequestService.findRecruitmentRequestByUser_Id(id);
    }

    @Override
    public List<RecruitmentRequestDTO> findAllByOrg_IdAndAcceptedAndEvent_Id(String id, Boolean accepted, Long event_id) {
        return recruitmentRequestService.findAllByOrg_IdAndAcceptedAndEvent_Id(id , accepted, event_id);
    }

    @Override
    public List<RecruitmentRequestDTO> findAllByAcceptedAndEvent_Id(Boolean accepted, Long event) {
        return recruitmentRequestService.findAllByAcceptedAndEvent_Id(accepted, event);
    }
}
