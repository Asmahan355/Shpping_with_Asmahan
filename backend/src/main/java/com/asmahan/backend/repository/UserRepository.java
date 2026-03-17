package com.asmahan.backend.repository;
import com.asmahan.backend.model;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
}