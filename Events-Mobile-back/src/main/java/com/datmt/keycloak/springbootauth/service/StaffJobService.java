package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.StaffJobDTO;

import java.util.List;

public interface StaffJobService {

    StaffJobDTO save (StaffJobDTO StaffJobDTO);

    StaffJobDTO findById(Long id);

    List<StaffJobDTO> findAll();

    void delete(Long id);
}
