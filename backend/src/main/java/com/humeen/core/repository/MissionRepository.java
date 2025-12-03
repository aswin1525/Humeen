package com.humeen.core.repository;

import com.humeen.core.model.Mission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MissionRepository extends JpaRepository<Mission, String> {
    List<Mission> findByPlanet(String planet);
}
