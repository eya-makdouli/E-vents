package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.StaffRequestDTO;
import com.datmt.keycloak.springbootauth.Model.StaffRequest;
import com.datmt.keycloak.springbootauth.Repository.StaffRequestRepository;
import com.datmt.keycloak.springbootauth.service.StaffRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class StaffRequestServiceImpl implements StaffRequestService {
    private final StaffRequestRepository staffRequestRepository;

    @Autowired
    public StaffRequestServiceImpl(StaffRequestRepository staffRequestRepository) {
        this.staffRequestRepository = staffRequestRepository;
    }

    @Override
    public StaffRequestDTO save(StaffRequestDTO staffRequestDTO) {
        return StaffRequestDTO.fromEntity(staffRequestRepository.save(StaffRequestDTO.toEntity(staffRequestDTO)));
    }

    @Override
    public StaffRequestDTO update(StaffRequestDTO staffRequestDTO, Long id) {
        StaffRequest staffRequest = staffRequestRepository.findById(id).get();
        staffRequest.setApropos(staffRequestDTO.getApropos());
        staffRequest.setStaffJob(staffRequestDTO.getStaffJob());
        staffRequest.setSolved(staffRequestDTO.getSolved());
        staffRequest.setUser(staffRequestDTO.getUser());
        staffRequest.setImage3(staffRequestDTO.getImage3());
        staffRequest.setRefused(staffRequestDTO.getRefused());
        staffRequest.setAccepted(staffRequestDTO.getAccepted());
        staffRequest.setImage2(staffRequestDTO.getImage2());
        staffRequest.setImage1(staffRequestDTO.getImage1());
        staffRequestRepository.save(staffRequest);

        return StaffRequestDTO.fromEntity(staffRequest);
    }

    @Override
    public StaffRequestDTO findStaffRequestByUser_Id(String id) {
        Optional<StaffRequest> staffRequest = staffRequestRepository.findStaffRequestByUser_Id(id);
        StaffRequestDTO dto = StaffRequestDTO.fromEntity(staffRequest.get());
        return dto;
    }

    @Override
    public StaffRequestDTO findById(Long id) {
        Optional<StaffRequest> staffRequest = staffRequestRepository.findById(id);
        StaffRequestDTO dto = StaffRequestDTO.fromEntity(staffRequest.get());
        return dto;
    }

    @Override
    public List<StaffRequestDTO> findAll() {
        return staffRequestRepository.findAll().stream().map(StaffRequestDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        staffRequestRepository.deleteById(id);
    }
}
