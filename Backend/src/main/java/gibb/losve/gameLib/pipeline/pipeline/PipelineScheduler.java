package gibb.losve.gameLib.pipeline.pipeline;

import gibb.losve.gameLib.pipeline.steam.SteamClient;
import gibb.losve.gameLib.pipeline.steam.dto.GameList;
import gibb.losve.gameLib.pipeline.steam.dto.GameResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PipelineScheduler {

    private static final Logger log = LoggerFactory.getLogger(PipelineScheduler.class);

    @Autowired
    SteamClient steamClient;

    @Autowired
    GameIngestionService gameIngestionService;

    @Autowired
    AchievementIngestionService achievementIngestionService;

    public void initiatePipeline() {
        log.info("Starting data pipeline...");

        // Step 1: Fetch game list from Steam
        int start = 50;
        int count = 100;
        GameResponse gameResponse = steamClient.fetchSteamGames(start, count);

        if (gameResponse == null || gameResponse.getItems() == null || gameResponse.getItems().isEmpty()) {
            log.warn("No games returned from Steam API");
            return;
        }

        List<GameList> gameList = gameResponse.getItems();
        log.info("Fetched {} games from Steam API", gameList.size());

        // Step 2: Ingest games into database, get list of ingested app IDs
        List<Integer> ingestedAppIds = gameIngestionService.ingestGames(gameList);
        log.info("Successfully ingested {} new games", ingestedAppIds.size());

        // Step 3: Fetch and ingest achievements for newly ingested games
        if (!ingestedAppIds.isEmpty()) {
            log.info("Fetching achievements for {} games...", ingestedAppIds.size());
            achievementIngestionService.ingestAchievements(ingestedAppIds);
        }

        log.info("Data pipeline completed");
    }

   // @Scheduled(cron = "0 3 * * * *", zone = "Europe/Berlin")
    private void schedulePipeline() {
        log.info("Scheduled pipeline triggered");
        initiatePipeline();
    }
}
