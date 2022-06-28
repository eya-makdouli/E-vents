package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.StaffRequestDTO;
import com.datmt.keycloak.springbootauth.controller.api.StaffRequestApi;
import com.datmt.keycloak.springbootauth.service.StaffRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class StaffRequestController implements StaffRequestApi {
    private StaffRequestService staffRequestService;
    @Autowired
    public StaffRequestController(StaffRequestService staffRequestService) {
        this.staffRequestService = staffRequestService;
    }

    @Override
    public StaffRequestDTO save(StaffRequestDTO staffRequestDTO) {
        return staffRequestService.save(staffRequestDTO);
    }

    @Override
    public StaffRequestDTO findById(Long id) {
        return staffRequestService.findById(id);
    }

    @Override
    public List<StaffRequestDTO> findAll() {
        return staffRequestService.findAll();
    }

    @Override
    public void delete(Long id) {
        staffRequestService.delete(id);
    }

    @Override
    public StaffRequestDTO update(StaffRequestDTO staffRequestDTO, Long id) {
        return staffRequestService.update(staffRequestDTO , id);
    }

    @Override
    public StaffRequestDTO findStaffRequestByUser_Id(String id) {
        return staffRequestService.findStaffRequestByUser_Id(id);
    }
}
