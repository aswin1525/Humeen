package com.humeen.core.controller;

import com.humeen.core.model.User;
import com.humeen.core.model.UserStats;
import com.humeen.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:3000")
public class StatsController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserStats(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get().getStats());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{username}")
    public ResponseEntity<?> updateUserStats(@PathVariable String username, @RequestBody Map<String, Object> updates) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User user = userOpt.get();
        UserStats stats = user.getStats();

        if (updates.containsKey("missionsCompleted")) {
            stats.setMissionsCompleted((Integer) updates.get("missionsCompleted"));
        }
        if (updates.containsKey("timeSpent")) {
            stats.setTimeSpent(((Number) updates.get("timeSpent")).doubleValue());
        }
        if (updates.containsKey("energyEarned")) {
            stats.setEnergyEarned((Integer) updates.get("energyEarned"));
        }
        if (updates.containsKey("activityFrontend")) {
            stats.setActivityFrontend((Integer) updates.get("activityFrontend"));
        }
        if (updates.containsKey("activityBackend")) {
            stats.setActivityBackend((Integer) updates.get("activityBackend"));
        }
        if (updates.containsKey("activitySecurity")) {
            stats.setActivitySecurity((Integer) updates.get("activitySecurity"));
        }
        if (updates.containsKey("activityData")) {
            stats.setActivityData((Integer) updates.get("activityData"));
        }

        userRepository.save(user); // Cascades to stats
        return ResponseEntity.ok(stats);
    }
}
