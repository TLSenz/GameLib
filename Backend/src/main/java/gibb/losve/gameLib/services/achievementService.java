package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.achivement.achivementDTO;
import gibb.losve.gameLib.dto.achivement.createAchivementDTO;
import gibb.losve.gameLib.dto.achivement.updateAchivementDTO;
import gibb.losve.gameLib.mapper.AchivementMapper;
import gibb.losve.gameLib.model.Achievement;
import gibb.losve.gameLib.repository.AchievementRepository;
import gibb.losve.gameLib.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class achievementService {

    @Autowired
    AchievementRepository achievementRepository;

    @Autowired
    AchivementMapper achievementMapper;

    @Autowired
    GameRepository gameRepository;

    List<achivementDTO> getAllAchievements(int numberOfAchievements) {
        return achievementRepository.findAll().stream()
                .map(achievement -> achievementMapper.toDTO(achievement))
                .limit(numberOfAchievements)
                .toList();
    }

    achivementDTO getAchievementById(String id) {
        return achievementRepository.findById(id)
                .map(achievement -> achievementMapper.toDTO(achievement))
                .orElseThrow(() -> new NoSuchElementException("Achievement not found"));
    }

    List<achivementDTO> getAchievementsByGameId(String gameId) {
        return achievementRepository.findByGameId(gameId).stream()
                .map(achievement -> achievementMapper.toDTO(achievement))
                .toList();
    }

    void createAchievement(createAchivementDTO achievement) {
        Achievement mappedAchievement = achievementMapper.toEntity(achievement);
        achievementRepository.save(mappedAchievement);
    }

    void updateAchievement(updateAchivementDTO achievement) {
        Achievement updatedAchievement = achievementMapper.toEntity(achievement);
        achievementRepository.save(updatedAchievement);
    }

    void deleteAchievement(String id) {
        achievementRepository.deleteById(id);
    }
}