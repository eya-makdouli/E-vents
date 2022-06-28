package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.LocationDTO;
import com.datmt.keycloak.springbootauth.DTO.StaffDTO;
import com.datmt.keycloak.springbootauth.DTO.StaffJobDTO;
import com.datmt.keycloak.springbootauth.Model.StaffJob;
import com.datmt.keycloak.springbootauth.Repository.StaffJobRepository;
import com.datmt.keycloak.springbootauth.service.StaffJobService;
import com.datmt.keycloak.springbootauth.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service

public class StaffJobServiceImpl implements StaffJobService {

    private StaffJobRepository staffJobRepository;
    @Autowired
    public StaffJobServiceImpl(StaffJobRepository staffJobRepository) {
        this.staffJobRepository = staffJobRepository;
    }


    @Override
    public StaffJobDTO save(StaffJobDTO staffJobDTO) {
        return StaffJobDTO.fromEntity(staffJobRepository.save(StaffJobDTO.toEntity(staffJobDTO)));


    }

    @Override
    public StaffJobDTO findById(Long id) {
        Optional<StaffJob> staffJob = staffJobRepository.findById(id);
        StaffJobDTO dto = StaffJobDTO.fromEntity(staffJob.get());
        return dto;
    }

    @Override
    public List<StaffJobDTO> findAll() {
        return staffJobRepository.findAll().stream().map(StaffJobDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        staffJobRepository.deleteById(id);
    }

}
