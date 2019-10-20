package hu.alkfejl2019.prototype.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hu.alkfejl2019.prototype.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	    
	Optional<User> findByName(String username);
	Optional<User> findByEmail(String email);
}
