package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Category;
import com.datmt.keycloak.springbootauth.Model.Staff;
import com.datmt.keycloak.springbootauth.Model.StaffJob;
import lombok.*;

import java.util.List;

@Builder
@Data

public class StaffJobDTO {

    private Long id;

    private String nameService;

    private Double price;

    private List<Staff> staffs;
    private List<Category> categories;



    public static StaffJobDTO fromEntity(StaffJob staffJobDTO){
        if (staffJobDTO == null){
            return null;
        }

        return StaffJobDTO.builder()
                .id(staffJobDTO.getId())
                .nameService(staffJobDTO.getNameService())
                .price((staffJobDTO.getPrice()))
                .staffs(staffJobDTO.getStaffs())
                .categories(staffJobDTO.getCategories())
                .build();
    }

    public static StaffJob toEntity(StaffJobDTO staffJobDTO){
        if (staffJobDTO == null) {
            return null;
        }

        StaffJob staffJob = new StaffJob();
        staffJob.setId(staffJobDTO.getId());
        staffJob.setNameService(staffJobDTO.getNameService());
        staffJob.setPrice(staffJobDTO.getPrice());
        staffJob.setStaffs(staffJobDTO.getStaffs());
        staffJob.setCategories(staffJobDTO.getCategories());
        return staffJob;
    }
}
