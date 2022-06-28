package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.StaffJobDTO;
import com.datmt.keycloak.springbootauth.controller.api.StaffJobApi;
import com.datmt.keycloak.springbootauth.service.StaffJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StaffJobController implements StaffJobApi {
    private StaffJobService staffJobService;
    @Autowired
    public StaffJobController(StaffJobService staffJobService) {
        this.staffJobService = staffJobService;
    }

    @Override
    public StaffJobDTO save(StaffJobDTO staffJobDTO) {
        return staffJobService.save(staffJobDTO);
    }

    @Override
    public StaffJobDTO findById(Long id) {
        return staffJobService.findById(id);
    }

    @Override
    public List<StaffJobDTO> findAll() {
        return staffJobService.findAll();
    }

    @Override
    public void delete(Long id) {
        staffJobService.delete(id);
    }
}
