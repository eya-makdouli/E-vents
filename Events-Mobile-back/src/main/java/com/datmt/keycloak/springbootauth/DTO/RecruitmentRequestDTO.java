package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.RecruitmentRequest;
import com.datmt.keycloak.springbootauth.Model.StaffJob;
import com.datmt.keycloak.springbootauth.Model.User;
import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class RecruitmentRequestDTO {
    private Long id;
    private User user;
    private User org ;
    private StaffJob staffJob;
    private Event event;
    private String need1;
    private String need2;
    private Integer price;
    private Boolean solved;
    private Boolean accepted;
    private Boolean refused;




    public static RecruitmentRequestDTO fromEntity(RecruitmentRequest recruitmentRequest){
        if (recruitmentRequest == null){
            return null;
        }

        return RecruitmentRequestDTO.builder()
                .id(recruitmentRequest.getId())
                .user(recruitmentRequest.getUser())
                .event((recruitmentRequest.getEvent()))
                .need1(recruitmentRequest.getNeed1())
                .need2(recruitmentRequest.getNeed2())
                .price(recruitmentRequest.getPrice())
                .solved(recruitmentRequest.getSolved())
                .accepted(recruitmentRequest.getAccepted())
                .refused(recruitmentRequest.getRefused())
                .org(recruitmentRequest.getOrg())
                .staffJob(recruitmentRequest.getStaffJob())
                .build();
    }

    public static RecruitmentRequest toEntity(RecruitmentRequestDTO recruitmentRequestDTO){
        if (recruitmentRequestDTO == null) {
            return null;
        }

        RecruitmentRequest recruitmentRequest = new RecruitmentRequest();
        recruitmentRequest.setId(recruitmentRequestDTO.getId());
        recruitmentRequest.setUser(recruitmentRequestDTO.getUser());
        recruitmentRequest.setEvent(recruitmentRequestDTO.getEvent());
        recruitmentRequest.setNeed1(recruitmentRequestDTO.getNeed1());
        recruitmentRequest.setNeed2(recruitmentRequestDTO.getNeed2());
        recruitmentRequest.setPrice(recruitmentRequestDTO.getPrice());
        recruitmentRequest.setSolved(recruitmentRequestDTO.getSolved());
        recruitmentRequest.setRefused(recruitmentRequestDTO.getRefused());
        recruitmentRequest.setAccepted(recruitmentRequestDTO.getAccepted());
        recruitmentRequest.setOrg(recruitmentRequestDTO.getOrg());
        recruitmentRequest.setStaffJob(recruitmentRequestDTO.getStaffJob());
        return recruitmentRequest;
    }
}
