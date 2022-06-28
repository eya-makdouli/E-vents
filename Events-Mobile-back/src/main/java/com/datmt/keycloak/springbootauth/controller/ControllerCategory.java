package com.datmt.keycloak.springbootauth.controller;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;
import com.datmt.keycloak.springbootauth.controller.api.CategoryApi;
import com.datmt.keycloak.springbootauth.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
public class ControllerCategory implements CategoryApi {

   private CategoryService categoryService;

   @Autowired
   public ControllerCategory(CategoryService categoryService){
       this.categoryService = categoryService;
   }
    @Override
    public CategoryDTO save(CategoryDTO dto) {

        return categoryService.save(dto);
    }

    @Override
    public CategoryDTO findById(Long id) {
        return categoryService.findById(id);
    }

    @Override
    public CategoryDTO findByGenre(String genre) {
        return categoryService.findByGenre(genre);
    }

    @Override
    public CategoryDTO findByIcon(String icon) {
        return categoryService.findByGenre(icon);
    }

    @Override
    public CategoryDTO UpdateCategory(Long id, CategoryDTO categoryDTO) {
        return categoryService.updateCategory( id,categoryDTO);}


    @Override
    public List<CategoryDTO> findAll() {
        return categoryService.findAll();
    }

    @Override
    public void delete(Long id) {
       categoryService.delete(id);
    }
}
