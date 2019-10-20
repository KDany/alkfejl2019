package hu.alkfejl2019.prototype.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hu.alkfejl2019.prototype.entities.Recipe;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Integer> {}
