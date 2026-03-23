package gibb.losve.gameLib.controller;

import gibb.losve.gameLib.pipeline.pipeline.AchievementIngestionService;
import gibb.losve.gameLib.pipeline.pipeline.GameIngestionService;
import gibb.losve.gameLib.pipeline.pipeline.PipelineScheduler;
import gibb.losve.gameLib.pipeline.steam.SteamClient;
import gibb.losve.gameLib.pipeline.steam.dto.GameList;
import gibb.losve.gameLib.pipeline.steam.dto.GameResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pipeline")
@Tag(name = "Pipeline", description = "Data pipeline debug endpoints")
public class  PipelineController {

    private static final Logger log = LoggerFactory.getLogger(PipelineController.class);

    @Autowired
    PipelineScheduler pipelineScheduler;

    @Autowired
    SteamClient steamClient;

    @Autowired
    GameIngestionService gameIngestionService;

    @Autowired
    AchievementIngestionService achievementIngestionService;

    @Operation(summary = "Run full pipeline", description = "Triggers the entire data ingestion pipeline")
    @PostMapping("/run")
    public ResponseEntity<Map<String, String>> runPipeline() {
        try {
            log.info("Manual pipeline trigger via API");
            pipelineScheduler.initiatePipeline();
            return ResponseEntity.ok(Map.of("status", "success", "message", "Pipeline completed"));
        } catch (Exception e) {
            log.error("Pipeline failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @Operation(summary = "Test Steam game list fetch", description = "Fetches games from Steam search API without persisting")
    @GetMapping("/test/games")
    public ResponseEntity<?> testFetchGames(
            @Parameter(description = "Start offset") @RequestParam(defaultValue = "0") int start,
            @Parameter(description = "Number of games to fetch") @RequestParam(defaultValue = "5") int count) {
        try {
            log.info("Test: fetching {} games starting from {}", count, start);
            GameResponse response = steamClient.fetchSteamGames(start, count);
            if (response == null) {
                return ResponseEntity.internalServerError()
                        .body(Map.of("status", "error", "message", "Response was null"));
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Test fetch games failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage(), "cause", String.valueOf(e.getCause())));
        }
    }

    @Operation(summary = "Test game details fetch", description = "Fetches details for a specific Steam app ID without persisting")
    @GetMapping("/test/details/{steamAppId}")
    public ResponseEntity<?> testFetchDetails(
            @Parameter(description = "Steam App ID") @PathVariable int steamAppId) {
        try {
            log.info("Test: fetching details for app ID {}", steamAppId);
            var details = steamClient.fetchGameDetails(steamAppId);
            if (details == null) {
                return ResponseEntity.ok(Map.of("status", "warning", "message", "No data returned (possibly null success or missing data field)"));
            }
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            log.error("Test fetch details failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage(), "cause", String.valueOf(e.getCause())));
        }
    }

    @Operation(summary = "Test achievements fetch", description = "Fetches achievements for a specific Steam app ID without persisting")
    @GetMapping("/test/achievements/{steamAppId}")
    public ResponseEntity<?> testFetchAchievements(
            @Parameter(description = "Steam App ID") @PathVariable int steamAppId) {
        try {
            log.info("Test: fetching achievements for app ID {}", steamAppId);
            var wrapper = steamClient.fetchAchievementsForGame(steamAppId);
            if (wrapper == null) {
                return ResponseEntity.ok(Map.of("status", "warning", "message", "Response was null"));
            }
            return ResponseEntity.ok(wrapper);
        } catch (Exception e) {
            log.error("Test fetch achievements failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage(), "cause", String.valueOf(e.getCause())));
        }
    }

    @Operation(summary = "Run game ingestion only", description = "Fetches games and ingests them into DB, returns ingested app IDs")
    @PostMapping("/run/games")
    public ResponseEntity<Map<String, Object>> runGameIngestion(
            @Parameter(description = "Number of games to fetch") @RequestParam(defaultValue = "10") int count) {
        try {
            log.info("Manual game ingestion trigger");
            GameResponse response = steamClient.fetchSteamGames(0, count);
            if (response == null || response.getItems() == null) {
                return ResponseEntity.ok(Map.of("status", "warning", "message", "No games returned", "ingested", List.of()));
            }
            List<Integer> ingested = gameIngestionService.ingestGames(response.getItems());
            return ResponseEntity.ok(Map.of("status", "success", "ingested", ingested));
        } catch (Exception e) {
            log.error("Game ingestion failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @Operation(summary = "Run achievement ingestion only", description = "Fetches achievements for given app IDs and ingests them")
    @PostMapping("/run/achievements")
    public ResponseEntity<Map<String, String>> runAchievementIngestion(
            @RequestBody List<Integer> steamAppIds) {
        try {
            log.info("Manual achievement ingestion trigger for {} games", steamAppIds.size());
            achievementIngestionService.ingestAchievements(steamAppIds);
            return ResponseEntity.ok(Map.of("status", "success", "message", "Achievements ingested for " + steamAppIds.size() + " games"));
        } catch (Exception e) {
            log.error("Achievement ingestion failed", e);
            return ResponseEntity.internalServerError()
                    .body(Map.of("status", "error", "message", e.getMessage()));
        }
    }
}
