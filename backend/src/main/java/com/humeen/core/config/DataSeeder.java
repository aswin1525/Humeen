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
                                                createMission("Theme Toggle Challenge",
                                                                "Learn to implement light and dark mode toggles using CSS variables and state management. Understand how theming affects user experience.",
                                                                "frontend", "MISSION_2", 10),
                                                createMission("Button Customization",
                                                                "Explore component reusability. Build a versatile button component with multiple variants, sizes, and states to maintain design consistency.",
                                                                "frontend", "MISSION_3", 15),
                                                createMission("Modal Interaction Task",
                                                                "Master the creation of accessible modal dialogs. Learn about focus trapping, z-index management, and backdrop interactions.",
                                                                "frontend",
                                                                "MISSION_4", 15),
                                                createMission("Design-to-Code Snippet Unlock",
                                                                "Create a developer-friendly code snippet viewer. Implement syntax highlighting and one-click copy functionality.",
                                                                "frontend", "MISSION_6", 10),
                                                createMission("Color Palette Creator",
                                                                "Understanding color theory in UI design. Create harmonious color palettes and apply them to interface elements effectively.",
                                                                "frontend", "MISSION_7", 15),

                                                // Backend Tower
                                                createMission("Hello API Check",
                                                                "Your first step into the server-side. Create a simple API endpoint that returns a greeting and verifies server connectivity.",
                                                                "backend", "MISSION_BACKEND_1", 10),
                                                createMission("Create Energy Record",
                                                                "Learn about HTTP POST requests. Implement an endpoint to receive data from the frontend and store simple records.",
                                                                "backend", "MISSION_BACKEND_2", 15),
                                                createMission("Update User Progress",
                                                                "Handle data persistence. Create logic to update existing user progress and maintain state across sessions.",
                                                                "backend", "MISSION_BACKEND_3", 15),
                                                createMission("JSON Repair Challenge",
                                                                "Debug data interchange formats. Identify and fix common JSON syntax errors that cause API communication failures.",
                                                                "backend", "MISSION_BACKEND_4", 10),
                                                createMission("List Missions API",
                                                                "Master data retrieval. Build an API to fetch lists of resources, implementing pagination or filtering concepts.",
                                                                "backend",
                                                                "MISSION_BACKEND_5", 20),

                                                // Cyber Security Planet
                                                createMission("Identify the Vulnerable Line",
                                                                "Develop a security mindset. Analyze code to spot potential security vulnerabilities before they become exploits.",
                                                                "security", "MISSION_SECURITY_1", 10),
                                                createMission("Fix the Input",
                                                                "Defend against Injection attacks. Learn the importance of input validation and sanitization to prevent malicious data entry.",
                                                                "security",
                                                                "MISSION_SECURITY_2", 15),
                                                createMission("Password Strength Check",
                                                                "Enforce strong authentication. Implement logic to check password complexity requirements and protect user credentials.",
                                                                "security",
                                                                "MISSION_SECURITY_3", 15),
                                                createMission("Stop the Fake Login",
                                                                "Recognize social engineering. Identify visual and technical clues that distinguish a legitimate login page from a fake one.",
                                                                "security", "MISSION_SECURITY_4", 20),
                                                createMission("Run a Safe Attack Demo",
                                                                "Simulate a cyber attack. Watch a harmless demonstration of how vulnerabilities are exploited to understand the attacker's perspective.",
                                                                "security",
                                                                "MISSION_SECURITY_5", 10),

                                                // Data Galaxy
                                                createMission("View Your Stats",
                                                                "Visualize data. Transform raw user numbers into meaningful statistics that provide insights into user behavior.",
                                                                "data",
                                                                "MISSION_DATA_1", 10),
                                                createMission("Compare Planets",
                                                                "Analyze trends. Compare different datasets to identify patterns, preferences, and anomalies in user activity.",
                                                                "data", "MISSION_DATA_2", 15),
                                                createMission("Unlock Skill Constellation",
                                                                "Visualizing networks. Create a node-link diagram to represent skills or connections between different data points.",
                                                                "data",
                                                                "MISSION_DATA_3", 10),
                                                createMission("Filter Activity Logs",
                                                                "Audit trails. Learn to filter and search through system logs to troubleshoot issues and monitor security events.",
                                                                "data",
                                                                "MISSION_DATA_4", 15),
                                                createMission("Predict Next Planet",
                                                                "Intro to predictive logic. Use simple algorithms to suggest future actions or items based on past user behavior.",
                                                                "data",
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
