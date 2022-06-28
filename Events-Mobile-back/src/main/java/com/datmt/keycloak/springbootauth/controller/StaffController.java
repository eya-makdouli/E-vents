package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.StaffDTO;
import com.datmt.keycloak.springbootauth.controller.api.StaffApi;
import com.datmt.keycloak.springbootauth.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class StaffController implements StaffApi {
    private StaffService staffService;
    @Autowired
    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }


    @Override
    public StaffDTO save(StaffDTO staffDTO) {
        return staffService.save(staffDTO);
    }

    @Override
    public StaffDTO findById(Long id) {
        return staffService.findById(id);
    }

    @Override
    public List<StaffDTO> findAll() {
        return staffService.findAll();
    }

    @Override
    public void delete(Long id) {
        staffService.delete(id);
    }

    @Override
    public List<StaffDTO> findAllByStaffJob_Id(Long id) {
        return staffService.findAllByStaffJob_Id(id);
    }
}
