package com.asmahan.backend.service;
import com.asmahan.backend.model.User;
import com.asmahan.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userepository;
    public UserService(UserRepository userepository){
        this.userepository=userepository;
    }

    public List<User> getAllUsers(){
        return userepository.findAll();
    }

    public User getUserById(Long id){
        return userepository.findById(id).orElse(null);
    }

    public User creatUser(User user){
        return userepository.save(user);
    }
    public User updateUser(Long id, User user){
        user.setId(id);
        return userepository.save(user);
    }
    public void deleteUser(Long id){
        userepository.deleteById(id);
    }

}
 
