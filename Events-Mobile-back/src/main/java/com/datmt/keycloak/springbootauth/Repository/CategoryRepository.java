package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findCategoryByGenre(String genre);
}
