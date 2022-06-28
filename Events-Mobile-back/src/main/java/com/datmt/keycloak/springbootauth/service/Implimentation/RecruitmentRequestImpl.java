package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.RecruitmentRequestDTO;
import com.datmt.keycloak.springbootauth.Model.RecruitmentRequest;
import com.datmt.keycloak.springbootauth.Repository.RecruitmentRequestRepository;
import com.datmt.keycloak.springbootauth.service.RecruitmentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class RecruitmentRequestImpl implements RecruitmentRequestService {
    private RecruitmentRequestRepository recruitmentRequestRepository;
    @Autowired
    public RecruitmentRequestImpl(RecruitmentRequestRepository recruitmentRequestRepository) {
        this.recruitmentRequestRepository = recruitmentRequestRepository;
    }


    @Override
    public RecruitmentRequestDTO save(RecruitmentRequestDTO recruitmentRequestDTO) {
        return RecruitmentRequestDTO.fromEntity(recruitmentRequestRepository.save(RecruitmentRequestDTO.toEntity(recruitmentRequestDTO)));
    }

    @Override
    public RecruitmentRequestDTO update(RecruitmentRequestDTO recruitmentRequestDTO, Long id) {

        RecruitmentRequest recruitmentRequest = recruitmentRequestRepository.findById(id).get();
        recruitmentRequest.setUser(recruitmentRequestDTO.getUser());
        recruitmentRequest.setEvent(recruitmentRequestDTO.getEvent());
        recruitmentRequest.setNeed1(recruitmentRequestDTO.getNeed1());
        recruitmentRequest.setNeed2(recruitmentRequestDTO.getNeed2());
        recruitmentRequest.setPrice(recruitmentRequestDTO.getPrice());
        recruitmentRequest.setSolved(recruitmentRequestDTO.getSolved());
        recruitmentRequest.setRefused(recruitmentRequestDTO.getRefused());
        recruitmentRequest.setAccepted(recruitmentRequestDTO.getAccepted());
        recruitmentRequestRepository.save(recruitmentRequest);
        return RecruitmentRequestDTO.fromEntity(recruitmentRequest);
    }

    @Override
    public List<RecruitmentRequestDTO> findRecruitmentRequestByUser_Id(String id) {
        return recruitmentRequestRepository.findAllByUser_Id(id).stream().map(RecruitmentRequestDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public RecruitmentRequestDTO findById(Long id) {
        Optional<RecruitmentRequest> recruitmentRequest = recruitmentRequestRepository.findById(id);
        RecruitmentRequestDTO dto = RecruitmentRequestDTO.fromEntity(recruitmentRequest.get());
        return dto;
    }

    @Override
    public List<RecruitmentRequestDTO> findAll() {
        return recruitmentRequestRepository.findAll().stream().map(RecruitmentRequestDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecruitmentRequestDTO> findAllByOrg_IdAndAcceptedAndEvent_Id(String id, Boolean accepted, Long event_id) {
        return recruitmentRequestRepository.findAllByOrg_IdAndAcceptedAndEvent_Id(id , accepted, event_id).stream().map(RecruitmentRequestDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecruitmentRequestDTO> findAllByAcceptedAndEvent_Id(Boolean accepted, Long event) {
        return recruitmentRequestRepository.findAllByAcceptedAndEvent_Id( accepted, event).stream().map(RecruitmentRequestDTO::fromEntity)
                .collect(Collectors.toList());
    }


    @Override
    public void delete(Long id) {
        recruitmentRequestRepository.deleteById(id);
    }
}
