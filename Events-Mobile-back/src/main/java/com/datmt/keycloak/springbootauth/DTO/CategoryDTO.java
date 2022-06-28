package com.datmt.keycloak.springbootauth.DTO;

import com.datmt.keycloak.springbootauth.Model.Category;

import com.datmt.keycloak.springbootauth.Model.Event;
import com.datmt.keycloak.springbootauth.Model.StaffJob;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class CategoryDTO {
    private Long id;
    private String genre;
    private String icon;
    private List<Event> events;
    private List<StaffJob> staffJobs;



    public static CategoryDTO fromEntity(Category category){
        if(category == null){
            return null;
        }
        return CategoryDTO.builder().id(category.getId())
                .genre(category.getGenre())
                .icon(category.getIcon())
                .events(category.getEvents())
                .staffJobs(category.getStaffJobs())
                .build();
    }

    public static Category toEntity(CategoryDTO categoryDTO) {
        if (categoryDTO == null) {
            return null;
        }
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setGenre(categoryDTO.getGenre());
        category.setIcon(categoryDTO.getIcon());
        category.setEvents(categoryDTO.getEvents());
        category.setStaffJobs(categoryDTO.getStaffJobs());


        return category;
    }

}
