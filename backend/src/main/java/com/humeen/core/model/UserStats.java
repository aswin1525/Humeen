package com.humeen.core.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "user_stats")
public class UserStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int missionsCompleted;
    private double timeSpent;
    private int energyEarned;

    // Activity levels for each planet (0-100)
    private int activityFrontend;
    private int activityBackend;
    private int activitySecurity;
    private int activityData;

    @OneToOne(mappedBy = "stats")
    @JsonIgnore
    private User user;

    public UserStats() {
        this.missionsCompleted = 0;
        this.timeSpent = 0.0;
        this.energyEarned = 0;
        this.activityFrontend = 0;
        this.activityBackend = 0;
        this.activitySecurity = 0;
        this.activityData = 0;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getMissionsCompleted() {
        return missionsCompleted;
    }

    public void setMissionsCompleted(int missionsCompleted) {
        this.missionsCompleted = missionsCompleted;
    }

    public double getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(double timeSpent) {
        this.timeSpent = timeSpent;
    }

    public int getEnergyEarned() {
        return energyEarned;
    }

    public void setEnergyEarned(int energyEarned) {
        this.energyEarned = energyEarned;
    }

    public int getActivityFrontend() {
        return activityFrontend;
    }

    public void setActivityFrontend(int activityFrontend) {
        this.activityFrontend = activityFrontend;
    }

    public int getActivityBackend() {
        return activityBackend;
    }

    public void setActivityBackend(int activityBackend) {
        this.activityBackend = activityBackend;
    }

    public int getActivitySecurity() {
        return activitySecurity;
    }

    public void setActivitySecurity(int activitySecurity) {
        this.activitySecurity = activitySecurity;
    }

    public int getActivityData() {
        return activityData;
    }

    public void setActivityData(int activityData) {
        this.activityData = activityData;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
