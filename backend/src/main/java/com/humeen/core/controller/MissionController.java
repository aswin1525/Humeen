package com.humeen.core.controller;

import com.humeen.core.model.Mission;
import com.humeen.core.repository.MissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@CrossOrigin(origins = "*") // Allow frontend access
public class MissionController {

    @Autowired
    private MissionRepository missionRepository;

    @GetMapping
    public List<Mission> getAllMissions() {
        return missionRepository.findAll();
    }

    @GetMapping("/planet/{planetName}")
    public List<Mission> getMissionsByPlanet(@PathVariable String planetName) {
        return missionRepository.findByPlanet(planetName);
    }

    @PostMapping
    public Mission createMission(@RequestBody Mission mission) {
        return missionRepository.save(mission);
    }

    @PostMapping("/{id}/complete")
    public Mission completeMission(@PathVariable String id) {
        return missionRepository.findById(id).map(mission -> {
            mission.setCompleted(true);
            return missionRepository.save(mission);
        }).orElseThrow(() -> new RuntimeException("Mission not found"));
    }

    @GetMapping("/ping")
    public java.util.Map<String, String> ping() {
        return java.util.Collections.singletonMap("message", "pong");
    }

    @PostMapping("/user/progress")
    public java.util.Map<String, String> updateProgress(@RequestBody java.util.Map<String, Object> payload) {
        return java.util.Collections.singletonMap("status", "updated");
    }
}
