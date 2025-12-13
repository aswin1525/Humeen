package com.humeen.core.controller;

import com.humeen.core.model.User;
import com.humeen.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }

        User newUser = new User(username, password);
        userRepository.save(newUser);
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if (username == null || password == null) {
            return ResponseEntity.badRequest().body("Username and password are required");
        }

        return userRepository.findByUsername(username)
                .map(user -> {
                    if (user.getPassword().equals(password)) {
                        return ResponseEntity.ok((Object) user);
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found"));
    }

    @PostMapping("/{username}/missions/{missionId}")
    public ResponseEntity<?> completeMission(@PathVariable String username, @PathVariable String missionId) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    user.getCompletedMissionIds().add(missionId);
                    userRepository.save(user);
                    return (ResponseEntity<?>) ResponseEntity.ok(user);
                })
                .orElse((ResponseEntity) ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }
}
