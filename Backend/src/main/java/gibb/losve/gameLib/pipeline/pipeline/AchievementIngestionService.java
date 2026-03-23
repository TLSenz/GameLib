package gibb.losve.gameLib.pipeline.pipeline;

import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.mapper.AchievementMapper;
import gibb.losve.gameLib.model.Achievement;
import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.pipeline.steam.dto.GameDto;
import gibb.losve.gameLib.services.achievementService;
import gibb.losve.gameLib.services.gameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;

import java.util.stream.Stream;

public class AchievementIngestionService {


    @Value("${steam.api_key}")
    private String steamApiKey;





    @Autowired
    gameService gameService;

    @Autowired
    AchievementMapper achievementMapper;

    @Autowired
    achievementService achievementService;


    public void ingestAchievements(Stream<Integer> steamAppIds){

        steamAppIds.forEach(steamAppId1 -> {
             GameDto achivements =  fetchGameAchievements(steamAppId1);
             achivements.getAvailableGameStats().getStats().forEach(gameStat -> {
                 CreateAchievementDTO createAchievementDTO = achievementMapper.toCreateAchievement(gameStat);
                 createAchievementDTO.setGameId(fetchGameId(steamAppId1));
                 achievementService.createAchievement(createAchievementDTO);
             });


        });
    }

    public GameDto fetchGameAchievements(int SteamAppId){

        RestClient client = RestClient.create();
        String baseUrl = "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/" +
                "?key=" + steamApiKey +
                "&appid=" + SteamAppId
                ;
        return client.get()
                .uri( "/    getAchimentForGame")
                .retrieve()
                .body(GameDto.class);
    }

    public String fetchGameId(int SteamAppId){
       return gameService.getGameBySteamAppId(SteamAppId).getId();
    }
}
