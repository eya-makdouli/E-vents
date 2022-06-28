package com.datmt.keycloak.springbootauth.service.Implimentation;

import com.datmt.keycloak.springbootauth.DTO.UserDTO;
import com.datmt.keycloak.springbootauth.Exceptions.EntityNotFoundException;
import com.datmt.keycloak.springbootauth.Exceptions.ErrorCodes;
import com.datmt.keycloak.springbootauth.Exceptions.InvalidEntityException;
import com.datmt.keycloak.springbootauth.Model.User;
import com.datmt.keycloak.springbootauth.Repository.UserRepository;
import com.datmt.keycloak.springbootauth.Validator.UserValidator;
import com.datmt.keycloak.springbootauth.service.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDTO save(UserDTO userDTO) {
        List<String> errors = UserValidator.validate(userDTO);
        if (!errors.isEmpty()) {
            log.error("l'utilisateur n'est pas valide {}", userDTO);
            throw new InvalidEntityException("l'utilisateur n'est pas valide", ErrorCodes.USER_NOT_VALID, errors);
        }


        return UserDTO.fromEntity((userRepository.save(UserDTO.toEntity(userDTO)))
        );
    }

    @Override
    public UserDTO findById(String id) {

        if (id == null) {
            log.error("id de l'utilisateur est null !");
            return null;
        }
        Optional<User> user = userRepository.findById(id);
        UserDTO dto = UserDTO.fromEntity(user.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun utilisateur avec l'id = " + id + " n'ete trouve",
                        ErrorCodes.USER_NOT_FOUND));


    }

    @Override
    public UserDTO findUserByUsername(String username) {
        if (username == null) {
            log.error("le psudo de l'utilisateur est null !");
            return null;
        }

        Optional<User> user = userRepository.findUserByUsername(username);
        UserDTO dto = UserDTO.fromEntity(user.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun utilisateur avec le psudo = " + username + " n'ete trouve",
                        ErrorCodes.USER_NOT_FOUND));
    }

    @Override
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream().map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String id) {
        if (id == null) {
            log.error("id de l'utilisateur est null !");
        }
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO findUserByEmail(String email) {
        if (email == null) {
            log.error("le email de l'utilisateur est null !");
            return null;
        }
        Optional<User> user = userRepository.findUserByEmail(email);
        UserDTO dto = UserDTO.fromEntity(user.get());
        return Optional.of(dto).orElseThrow(() ->
                new EntityNotFoundException("Aucun utilisateur avec le psudo = " + email + " n'ete trouve",
                        ErrorCodes.USER_NOT_FOUND));
    }

    @Override
    public Optional<UserDTO> update(String id, UserDTO dto) {
        return userRepository.findById(id).map(user -> {
                user.setUsername(dto.getUsername());
                user.setEmail(dto.getEmail());
                user.setEvents(dto.getEvents());
                user.setLocation(dto.getLocation());
                user.setPhoneNumber(dto.getPhoneNumber());
                user.setRole(dto.getRole());
                user.setLastname(dto.getLastname());
                user.setFirstname(dto.getFirstname());
                user.setPassword(dto.getPassword());
                user.setDeleted(dto.getDeleted());
                user.setIsEnabled(dto.getIsEnabled());
                user.setHasEmail(dto.getHasEmail());
                user.setPicture(dto.getPicture());
                user.setStaff(dto.getStaff());
                user.setOrganisateur(dto.getOrganisateur());
                user.setNotifications(dto.getNotifications());
                user.setBio(dto.getBio());
                user.setIsAdmin(dto.getIsAdmin());
                user.setIsStaff(dto.getIsStaff());
                userRepository.save(user);
                UserDTO userDTO = UserDTO.fromEntity(user);
                System.out.println(userDTO);
           return userDTO;
        });
    }


    @Override
    public List<UserDTO> findAllByFirstnameLike(String firstname) {
        return userRepository.findAllByFirstnameLike(firstname).stream().map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> findAllByIsStaff(Boolean isStaff) {
        return userRepository.findAllByIsStaff(isStaff).stream().map(UserDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
