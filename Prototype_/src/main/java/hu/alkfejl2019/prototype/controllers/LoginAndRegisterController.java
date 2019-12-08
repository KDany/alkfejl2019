package hu.alkfejl2019.prototype.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hu.alkfejl2019.prototype.entities.User;
import hu.alkfejl2019.prototype.repositories.UserRepository;

@RestController
@RequestMapping("")
public class LoginAndRegisterController {
	
	 @Autowired
	 private UserRepository userRepository;
	 
	 @Autowired
	 private BCryptPasswordEncoder passwordEncoder;
	 
	 @PostMapping("/register")
	 public ResponseEntity<User> register(@RequestBody User user) {
		 
	    Optional<User> oUser = userRepository.findByName(user.getName());
	    if (oUser.isPresent()) {
	        return ResponseEntity.badRequest().build();
	    }
	     
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    user.setRole(User.Role.ROLE_USER);
	    return ResponseEntity.ok(userRepository.save(user));
	 }

	 @PostMapping("/login")
	 public ResponseEntity<User> login(@RequestBody User user) {
             Optional<User> usr = userRepository.findByName(user.getName());
             if(usr.isPresent())
             {
		 return ResponseEntity.ok(usr.get());
             }
             return ResponseEntity.ok().build();
	 }
}
