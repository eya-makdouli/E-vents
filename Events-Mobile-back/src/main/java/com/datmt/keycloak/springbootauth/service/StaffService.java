package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.StaffDTO;
import com.datmt.keycloak.springbootauth.Model.Staff;


import java.util.List;

public interface StaffService {
    List<StaffDTO> findAllByStaffJob_Id(Long id);
    StaffDTO save (StaffDTO staffDTO);

    StaffDTO findById(Long id);

    List<StaffDTO> findAll();

    void delete(Long id);
}