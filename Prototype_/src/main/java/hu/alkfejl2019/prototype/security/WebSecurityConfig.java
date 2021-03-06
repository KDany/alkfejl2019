/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hu.alkfejl2019.prototype.security;

import hu.alkfejl2019.prototype.security.CustomBasicAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author KeresztiKrisztián
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http
          .cors()
              .and()
          .csrf().disable()
          .authorizeRequests()
              .antMatchers("/h2/**", "/users/register").permitAll()   // important!
              .anyRequest().authenticated()
              .and()
          .httpBasic()
              .authenticationEntryPoint(getBasicAuthEntryPoint())
              .and()
          .headers()      // important!
              .frameOptions().disable()
              .and()
          .sessionManagement()
              .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }    
    @Autowired
    protected void configureAuthentication(AuthenticationManagerBuilder auth) throws Exception {
      auth
          .userDetailsService(userDetailsService)
          .passwordEncoder(passwordEncoder());
    }
    @Autowired
    protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
      auth
          .inMemoryAuthentication()
          .withUser("user").password("$2a$12$lrhUnhZ/GXpZPiuzLImtkOCHZ0lc8VzxSABq2QyghegKefLFxJzZe").roles("USER");
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
        return new CustomBasicAuthenticationEntryPoint();
    }
}
