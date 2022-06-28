package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.*;
import com.datmt.keycloak.springbootauth.Model.Staff;
import com.datmt.keycloak.springbootauth.Repository.StaffRepository;
import com.datmt.keycloak.springbootauth.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class StaffServiceImpl implements StaffService {
    private final StaffRepository staffRepository;
    @Autowired
    public StaffServiceImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }


    @Override
    public List<StaffDTO> findAllByStaffJob_Id(Long id) {
        return staffRepository.findAllByStaffJob_Id(id).stream().map(StaffDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public StaffDTO save(StaffDTO staffDTO) {
        return StaffDTO.fromEntity(staffRepository.save(StaffDTO.toEntity(staffDTO)));

    }

    @Override
    public StaffDTO findById(Long id) {
        Optional<Staff> location = staffRepository.findById(id);
        StaffDTO dto = StaffDTO.fromEntity(location.get());
        return dto;
    }

    @Override
    public List<StaffDTO> findAll() {
        return staffRepository.findAll().stream().map(StaffDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        staffRepository.deleteById(id);
    }

}
