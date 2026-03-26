package gibb.losve.gameLib.pipeline.pipeline;

import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.mapper.AchievementMapper;
import gibb.losve.gameLib.pipeline.steam.SteamClient;
import gibb.losve.gameLib.pipeline.steam.dto.AchievementResponseWrapperDto;
import gibb.losve.gameLib.pipeline.steam.dto.GameDto;
import gibb.losve.gameLib.pipeline.steam.dto.GameStatDto;
import gibb.losve.gameLib.services.achievementService;
import gibb.losve.gameLib.services.gameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AchievementIngestionService {

    private static final Logger log = LoggerFactory.getLogger(AchievementIngestionService.class);

    @Autowired
    gameService gameService;

    @Autowired
    AchievementMapper achievementMapper;

    @Autowired
    achievementService achievementService;

    @Autowired
    SteamClient steamClient;

    public void ingestAchievements(List<Integer> steamAppIds) {
        for (Integer steamAppId : steamAppIds) {
            try {
                AchievementResponseWrapperDto wrapper = steamClient.fetchAchievementsForGame(steamAppId);
                if (wrapper == null || wrapper.getGame() == null) {
                    log.warn("No achievement data returned for app ID: {}", steamAppId);
                    continue;
                }

                GameDto gameDto = wrapper.getGame();
                if (gameDto.getAvailableGameStats() == null
                        || gameDto.getAvailableGameStats().getAchievements() == null
                        || gameDto.getAvailableGameStats().getAchievements().isEmpty()) {
                    log.debug("No achievements found for app ID: {}", steamAppId);
                    continue;
                }

                String gameId = fetchGameId(steamAppId);
                if (gameId == null) {
                    log.warn("Game not found in DB for app ID: {}, skipping achievements", steamAppId);
                    continue;
                }

                List<GameStatDto> stats = gameDto.getAvailableGameStats().getAchievements();
                for (GameStatDto gameStat : stats) {
                    try {
                        CreateAchievementDTO createAchievementDTO = achievementMapper.toCreateAchievement(gameStat);
                        createAchievementDTO.setGameId(gameId);
                        if (achievementService.check_if_achievement_exists(createAchievementDTO.getTitle())){
                            achievementService.createAchievement(createAchievementDTO);
                            log.info("Ingested {} achievements for app ID: {}", stats.size(), steamAppId);
                        }
                        else {
                            log.info("Could not insert Achivement because Achivement already does exist");
                        }
                    } catch (Exception e) {
                        log.error("Failed to create achievement '{}' for app ID: {}",
                                gameStat.getName(), steamAppId, e);
                    }
                }
            } catch (Exception e) {
                log.error("Failed to ingest achievements for app ID: {}", steamAppId, e);
            }
        }
    }

    private String fetchGameId(int steamAppId) {
        try {
            return gameService.getGameBySteamAppId(steamAppId).getId();
        } catch (Exception e) {
            log.error("Could not fetch game ID for steamAppId: {}", steamAppId, e);
            return null;
        }
    }
}
