package gibb.losve.gameLib.pipeline.steam;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gibb.losve.gameLib.pipeline.steam.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Component
public class SteamClient {

    private final String searchBaseUrl;
    private final String detailsBaseUrl;
    private final String achievementsBaseUrl;
    private final String steamApiKey;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public SteamClient(
            @Value("${steam.api_url.get_list}") String searchBaseUrl,
            @Value("${steam.api_url.get-details}") String detailsBaseUrl,
            @Value("${steam.api_url.get_achievements}") String achievementsBaseUrl,
            @Value("${steam.api_key}") String steamApiKey) {
        this.searchBaseUrl = searchBaseUrl;
        this.detailsBaseUrl = detailsBaseUrl;
        this.achievementsBaseUrl = achievementsBaseUrl;
        this.steamApiKey = steamApiKey;
        this.restClient = RestClient.create();
        this.objectMapper = new ObjectMapper();
    }

    public GameResponse fetchSteamGames(int start, int count) {
        String url = String.format("%s?start=%d&count=%d&json=1", searchBaseUrl, start, count);
        GameResponse games = restClient.get()
                .uri(url)
                .retrieve()
                .body(GameResponse.class);

        return games;
    }

    public String fetchSteamGamesTest(int start, int count) {
        String url = String.format("%s?start=%d&count=%d&json=1", searchBaseUrl, start, count);
        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }

    public SteamAppDataDto fetchGameDetails(int steamAppId) {
        String url = String.format("%s%d", detailsBaseUrl, steamAppId);
        String response = restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);

        try {
            TypeReference<Map<String, SteamAppWrapperDto>> typeRef = new TypeReference<>() {};
            Map<String, SteamAppWrapperDto> root = objectMapper.readValue(response, typeRef);
            SteamAppWrapperDto wrapper = root.values().iterator().next();
            if (wrapper != null && wrapper.isSuccess() && wrapper.getData() != null) {
                return wrapper.getData();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse game details for app ID: " + steamAppId, e);
        }
        return null;
    }

    public AchievementResponseWrapperDto fetchAchievementsForGame(int steamAppId) {
        String url = String.format("%s?key=%s&appid=%d", achievementsBaseUrl, steamApiKey, steamAppId);
        return restClient.get()
                .uri(url)
                .retrieve()
                .body(AchievementResponseWrapperDto.class);
    }

    public String fetchAchievementsForGameTest(int steamAppId) {
        String url = String.format("%s?key=%s&appid=%d", achievementsBaseUrl, steamApiKey, steamAppId);
        return restClient.get()
                .uri(url)
                .retrieve()
                .body(String.class);
    }
}
