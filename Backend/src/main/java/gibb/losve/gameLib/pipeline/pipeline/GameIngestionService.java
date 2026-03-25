package gibb.losve.gameLib.pipeline.pipeline;

import gibb.losve.gameLib.dto.game.CreateGameDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.mapper.GameMapper;
import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.pipeline.normalization.SteamNormalizer;
import gibb.losve.gameLib.pipeline.steam.SteamClient;
import gibb.losve.gameLib.pipeline.steam.dto.GameList;
import gibb.losve.gameLib.pipeline.steam.dto.SteamAppDataDto;
import gibb.losve.gameLib.repository.GameRepository;
import gibb.losve.gameLib.services.achievementService;
import gibb.losve.gameLib.services.gameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@Service
public class GameIngestionService {

    private static final Logger log = LoggerFactory.getLogger(GameIngestionService.class);

    @Autowired
    gameService gameService;

    @Autowired
    SteamClient steamClient;

    @Autowired
    SteamNormalizer steamNormalizer;

    @Autowired
    GameRepository gameRepository;
    @Autowired
    private achievementService achievementService;
    @Autowired
    private AchievementIngestionService achievementIngestionService;

    public List<Integer> ingestGames(List<GameList> gameList) {
        List<Integer> ingestedAppIds = new ArrayList<>();

        for (GameList item : gameList) {
            String appIdStr = extractAppId(item.getLogo());
            if (appIdStr == null) {
                log.warn("Could not extract app ID from URL: {}", item.getLogo());
                continue;
            }

            int appId;
            try {
                appId = Integer.parseInt(appIdStr);
            } catch (NumberFormatException e) {
                log.warn("Invalid app ID: {}", appIdStr);
                continue;
            }

            if (isGameAlreadyInDB(appId)) {
                log.info("Game already in DB, going to Achivemnt insertion: {}", appId);
                achievementIngestionService.ingestAchievements(List.of(appId));
                log.info("Ingested achievemnentts for game: {} ", appId);
                continue;
            }

            try {
                SteamAppDataDto appData = steamClient.fetchGameDetails(appId);
                if (appData == null) {
                    log.warn("No details returned for app ID: {}", appId);
                    continue;
                }

                Game game = steamNormalizer.mapToInternalGame(appData);
                if (game == null) {
                    log.warn("Normalization returned null for app ID: {}", appId);
                    continue;
                }

                gameRepository.save(game);
                ingestedAppIds.add(appId);
                log.info("Ingested game: {} (app ID: {})", game.getTitle(), appId);

            } catch (Exception e) {
                log.error("Failed to ingest game with app ID: {}", appId, e);
            }
        }

        return ingestedAppIds;
    }

    boolean isGameAlreadyInDB(int steamAppId) {
        try {
            GameDTO game = gameService.getGameBySteamAppId(steamAppId);
            return game != null;
        } catch (NoSuchElementException e) {
            return false;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String extractAppId(String url) {
        if (url == null) {
            return null;
        }
        Pattern pattern = Pattern.compile("/apps/(\\d+)");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }
}
