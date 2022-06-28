package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.CategoryDTO;
import com.datmt.keycloak.springbootauth.Exceptions.EntityNotFoundException;
import com.datmt.keycloak.springbootauth.Exceptions.ErrorCodes;
import com.datmt.keycloak.springbootauth.Exceptions.InvalidEntityException;
import com.datmt.keycloak.springbootauth.Model.Category;

import com.datmt.keycloak.springbootauth.Repository.CategoryRepository;

import com.datmt.keycloak.springbootauth.Validator.CategoryValidator;

import com.datmt.keycloak.springbootauth.service.CategoryService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;



    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository ) {
        this.categoryRepository = categoryRepository;

    }

    @Override
    public CategoryDTO save(CategoryDTO categoryDTO) {
        List<String> errors = CategoryValidator.validate(categoryDTO);
        if (!errors.isEmpty()) {
            log.error("l'utilisateur n'est pas valide {}", categoryDTO);
            throw new InvalidEntityException("l'utilisateur n'est pas valide", ErrorCodes.CATEGORY_NOT_VALID, errors);
        }

        return CategoryDTO.fromEntity(
                categoryRepository.save(CategoryDTO.toEntity(categoryDTO))
        );
    }

    @Override
    public CategoryDTO findById(Long id) {

        Optional<Category> category = categoryRepository.findById(id);
        CategoryDTO dto = CategoryDTO.fromEntity(category.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun categorie avec l'id = " + id + " n'ete trouve",
                        ErrorCodes.CATEGORY_NOT_FOUND));
    }


    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id).get();
        category.setGenre(categoryDTO.getGenre());
        category.setIcon(category.getIcon());
        categoryRepository.save(category);

        return CategoryDTO.fromEntity(category);

    }



    @Override
    public CategoryDTO findByGenre(String genre) {
        if (!StringUtils.hasLength(genre)) {
            log.error(" genre de catégorie est null!");
            return null;
        }
        Optional<Category> category = categoryRepository.findCategoryByGenre(genre);
        CategoryDTO dto = CategoryDTO.fromEntity(category.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun categorie avec le genre = " + genre + " n'ete trouve",
                        ErrorCodes.CATEGORY_NOT_FOUND));
    }
    @Override
    public CategoryDTO findByIcon(String icon) {

        Optional<Category> category = categoryRepository.findCategoryByGenre(icon);
        CategoryDTO dto = CategoryDTO.fromEntity(category.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun categorie avec le genre = " + icon + " n'ete trouve",
                        ErrorCodes.CATEGORY_NOT_FOUND));
    }


    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (id == null) {
            log.error(" Catégorie ID est null");
            return;
        }
        categoryRepository.deleteById(id);
    }
}