package com.asmahan.backend.controller;

import com.asmahan.backend.service.UserService;
import com.asmahan.backend.model.User;

import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/users")
// Autorise Angular (port 4200) à appeler le backend
@CrossOrigin(origins="*")
public class UserController{
    private final UserService userService;

    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return this.userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user){
        return this.userService.creatUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id,@RequestBody User user){
        return this.userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        this.userService.deleteUser(id);
    }
}