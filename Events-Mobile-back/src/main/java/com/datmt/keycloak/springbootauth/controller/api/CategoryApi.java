package com.datmt.keycloak.springbootauth.controller.api;
import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.datmt.keycloak.springbootauth.Constants.Constants.APP_ROOT;

public interface CategoryApi {
    @CrossOrigin(origins = "*")
    @PostMapping(value = APP_ROOT +"/category/create" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDTO save (@RequestBody CategoryDTO categoryDTO);
    @CrossOrigin(origins = "*")
    @GetMapping(value = APP_ROOT +"/category/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDTO findById(@PathVariable("id") Long id);
    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/category/genre/{genre}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDTO findByGenre(@PathVariable("genre") String genre);
    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/category/icon/{icon}", produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDTO findByIcon(@PathVariable("icon") String genre);
    @CrossOrigin(origins = "*")
    @PutMapping(value = APP_ROOT +"/category/update/{id}" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    CategoryDTO UpdateCategory (@PathVariable("id") Long id,@RequestBody CategoryDTO categoryDTO);
    @CrossOrigin(origins = "*")
    @GetMapping (value = APP_ROOT +"/category/all" , produces = MediaType.APPLICATION_JSON_VALUE)
    List<CategoryDTO> findAll();
    @CrossOrigin(origins = "*")
    @DeleteMapping (value = APP_ROOT +"/category/delete/{id}")
    void delete(@PathVariable("id") Long id);
}
