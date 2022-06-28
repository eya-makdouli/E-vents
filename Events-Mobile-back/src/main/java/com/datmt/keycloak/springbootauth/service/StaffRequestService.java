package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.StaffRequestDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRequestService {
    StaffRequestDTO save (StaffRequestDTO staffRequestDTO);

    StaffRequestDTO update (StaffRequestDTO staffRequestDTO, Long id);

    StaffRequestDTO findStaffRequestByUser_Id(String id);

    StaffRequestDTO findById(Long id);

    List<StaffRequestDTO> findAll();

    void delete(Long id);
}
