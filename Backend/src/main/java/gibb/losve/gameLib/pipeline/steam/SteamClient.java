package gibb.losve.gameLib.pipeline.steam;

import gibb.losve.gameLib.pipeline.steam.dto.GameList;
import gibb.losve.gameLib.pipeline.steam.dto.GameResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;


@AllArgsConstructor
public class SteamClient {

    @Value("${steam.api_url.get_list}")
    private final String uri_base;

 /*   @Value("${steam.api_key}")
    private final String api_key;  */




    public GameResponse fetchSteamGames(int start, int count){
        RestClient client = RestClient.create();

        String url = String.format("%s/start=%d&count=%d&json=1", uri_base, start, count);

        return client.get()
                .uri(url)
                .retrieve()
                .body(GameResponse.class);
    }




    public void fetchAchivementsForSteamGame(int steamAppId){
        RestClient client = RestClient.create();

        String result = client.get()
                .uri( "/getAchimentForGame")
                .retrieve()
                .body(String.class);
    }
}
