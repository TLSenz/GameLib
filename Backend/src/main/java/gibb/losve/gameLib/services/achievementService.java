package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.achivement.AchievementDTO;
import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.achivement.UpdateAchievementDTO;
import gibb.losve.gameLib.mapper.AchievementMapper;
import gibb.losve.gameLib.model.Achievement;
import gibb.losve.gameLib.repository.AchievementRepository;
import gibb.losve.gameLib.repository.GameRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class achievementService {

    @Autowired
    AchievementRepository achievementRepository;

    @Autowired
    AchievementMapper achievementMapper;

    @Autowired
    GameRepository gameRepository;

    public List<AchievementDTO> getAllAchievements(int numberOfAchievements) {
        return achievementRepository.findAll().stream()
                .map(achievement -> achievementMapper.toDTO(achievement))
                .limit(numberOfAchievements)
                .toList();
    }

    public List<AchievementDTO> getAchievementsByGameId(String gameId) {
        return achievementRepository.findByGameId(new ObjectId(gameId)).stream()
                .map(achievement -> achievementMapper.toDTO(achievement))
                .toList();
    }

    public void createAchievement(CreateAchievementDTO achievement) {
        Achievement mappedAchievement = achievementMapper.toEntity(achievement);
        achievementRepository.save(mappedAchievement);
    }

    public void updateAchievement(UpdateAchievementDTO achievement) {
        Achievement existing = achievementRepository
                .findById(achievement.getId())
                .orElseThrow(() -> new NoSuchElementException("Achievement not found"));

        achievementMapper.updateEntityFromDto(achievement, existing);

        achievementRepository.save(existing);
    }

    public boolean doesAchievementExist(String id){
        return achievementRepository.findById(id).isPresent();
    }

    public void deleteAchievement(String id) {
        achievementRepository.deleteById(id);
    }
}