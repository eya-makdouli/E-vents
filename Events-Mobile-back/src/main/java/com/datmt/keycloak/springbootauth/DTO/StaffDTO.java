package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
public class StaffDTO {

    private Long id;

    private User user;

    private Boolean available;

    private List<Event> events ;

    private StaffJob staffJob;



    public static StaffDTO fromEntity(Staff staff){
        if(staff == null){
            return null;
        }
        return StaffDTO.builder()
                .id(staff.getId())
                .staffJob(staff.getStaffJob())
                .available(staff.getAvailable())
                .events(staff.getEvents())
                .user(staff.getUser())
                .build();
    }

    public static Staff toEntity(StaffDTO staffDTO) {
        if (staffDTO == null) {
            return null;
        }
        Staff staff = new Staff();
        staff.setId(staffDTO.getId());
        staff.setStaffJob(staffDTO.getStaffJob());
        staff.setEvents(staffDTO.getEvents());
        staff.setUser(staffDTO.getUser());
        staff.setAvailable(staffDTO.getAvailable());
        return staff;
    }

}
