package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.StaffJob;
import com.datmt.keycloak.springbootauth.Model.StaffRequest;
import com.datmt.keycloak.springbootauth.Model.User;
import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class StaffRequestDTO {
    private Long id;
    private User user;
    private StaffJob staffJob;
    private String image1;
    private String image2;
    private String image3;
    private Boolean solved;
    private Boolean accepted;
    private Boolean refused;
    private String apropos;



    public static StaffRequestDTO fromEntity(StaffRequest staffRequest){
        if (staffRequest == null){
            return null;
        }

        return StaffRequestDTO.builder()
                .id(staffRequest.getId())
                .user(staffRequest.getUser())
                .staffJob((staffRequest.getStaffJob()))
                .image1(staffRequest.getImage1())
                .image2(staffRequest.getImage2())
                .image3(staffRequest.getImage3())
                .solved(staffRequest.getSolved())
                .accepted(staffRequest.getAccepted())
                .refused(staffRequest.getRefused())
                .apropos(staffRequest.getApropos())
                .build();
    }

    public static StaffRequest toEntity(StaffRequestDTO staffRequestDTO){
        if (staffRequestDTO == null) {
            return null;
        }

        StaffRequest staffRequest = new StaffRequest();
        staffRequest.setId(staffRequestDTO.getId());
        staffRequest.setUser(staffRequestDTO.getUser());
        staffRequest.setStaffJob(staffRequestDTO.getStaffJob());
        staffRequest.setImage1(staffRequestDTO.getImage1());
        staffRequest.setImage2(staffRequestDTO.getImage2());
        staffRequest.setImage3(staffRequestDTO.getImage3());
        staffRequest.setSolved(staffRequestDTO.getSolved());
        staffRequest.setRefused(staffRequestDTO.getRefused());
        staffRequest.setAccepted(staffRequestDTO.getAccepted());
        staffRequest.setApropos(staffRequestDTO.getApropos());
        return staffRequest;
    }



}
