package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;


import java.util.List;

public interface CategoryService {
    CategoryDTO save (CategoryDTO categoryDTO);

    CategoryDTO findById(Long id);

    CategoryDTO findByGenre(String genre);

    CategoryDTO findByIcon(String icon);

    CategoryDTO updateCategory(Long id,CategoryDTO categoryDTO);

    List<CategoryDTO> findAll();

    void delete(Long id);

}