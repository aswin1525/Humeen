package com.humeen.core.config;

import com.humeen.core.model.Mission;
import com.humeen.core.repository.MissionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataSeeder {

        @Bean
        CommandLineRunner initDatabase(MissionRepository repository) {
                return args -> {
                        if (repository.count() == 0) {
                                List<Mission> missions = Arrays.asList(
                                                // Frontend Planet
                                                createMission("Style the Card",
                                                                "Customize a UI card using preset style controls.",
                                                                "frontend", "MISSION_1", 10),
                                                createMission("Theme Toggle Challenge",
                                                                "Switch the interface between Light, Dark, and Neon themes.",
                                                                "frontend", "MISSION_2", 10),
                                                createMission("Button Customization",
                                                                "Modify a button component using preset controls.",
                                                                "frontend", "MISSION_3", 15),
                                                createMission("Modal Interaction Task",
                                                                "Trigger and customize a modal popup.", "frontend",
                                                                "MISSION_4", 15),
                                                createMission("Layout Reorder Challenge",
                                                                "Rearrange layout blocks in a simple flex/grid layout.",
                                                                "frontend", "MISSION_5", 20),
                                                createMission("Design-to-Code Snippet Unlock",
                                                                "Choose a UI variant and view its JSX snippet.",
                                                                "frontend", "MISSION_6", 10),
                                                createMission("Color Palette Creator",
                                                                "Customize a 3-color palette and apply it to a heading.",
                                                                "frontend", "MISSION_7", 15),

                                                // Backend Tower
                                                createMission("Hello API Check", "Make your first backend request.",
                                                                "backend", "MISSION_BACKEND_1", 10),
                                                createMission("Create Energy Record", "Send data to backend.",
                                                                "backend", "MISSION_BACKEND_2", 15),
                                                createMission("Update User Progress", "Update mission progress in DB.",
                                                                "backend", "MISSION_BACKEND_3", 15),
                                                createMission("JSON Repair Challenge", "Fix a broken JSON snippet.",
                                                                "backend", "MISSION_BACKEND_4", 10),
                                                createMission("List Missions API", "Retrieve all missions.", "backend",
                                                                "MISSION_BACKEND_5", 20),

                                                // Cyber Security Planet
                                                createMission("Identify the Vulnerable Line", "Spot a common issue.",
                                                                "security", "MISSION_SECURITY_1", 10),
                                                createMission("Fix the Input", "Sanitize user input.", "security",
                                                                "MISSION_SECURITY_2", 15),
                                                createMission("Password Strength Check",
                                                                "Learn basic security validation.", "security",
                                                                "MISSION_SECURITY_3", 15),
                                                createMission("Stop the Fake Login", "Identify phishing clues.",
                                                                "security", "MISSION_SECURITY_4", 20),
                                                createMission("Run a Safe Attack Demo",
                                                                "Watch a simulated attack animation.", "security",
                                                                "MISSION_SECURITY_5", 10),

                                                // Data Galaxy
                                                createMission("View Your Stats", "Read user analytics.", "data",
                                                                "MISSION_DATA_1", 10),
                                                createMission("Compare Planets", "See which planet you visited most.",
                                                                "data", "MISSION_DATA_2", 15),
                                                createMission("Unlock Skill Constellation",
                                                                "Reveal a simple visual skill map.", "data",
                                                                "MISSION_DATA_3", 10),
                                                createMission("Filter Activity Logs", "Browsing recent events.", "data",
                                                                "MISSION_DATA_4", 15),
                                                createMission("Predict Next Planet", "Basic suggestion engine.", "data",
                                                                "MISSION_DATA_5", 20));
                                repository.saveAll(missions);
                        }
                };
        }

        private Mission createMission(String title, String description, String planet, String type, int energy) {
                Mission mission = new Mission();
                mission.setTitle(title);
                mission.setDescription(description);
                mission.setPlanet(planet);
                mission.setType(type);
                mission.setEnergyPoints(energy);
                mission.setCompleted(false);
                return mission;
        }
}
