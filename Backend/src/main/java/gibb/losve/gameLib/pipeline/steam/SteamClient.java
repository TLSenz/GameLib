package gibb.losve.gameLib.pipeline.steam;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;

public class SteamClient {

    @Value("${steam.api_url}")
    private final String uri_base;

    @Value("${steam.api_key}")
    private final String api_key;




    public void fetchSteamGames(){
        RestClient client = RestClient.create();


        String result = client.get()
                .uri(uri_base + "/getAllGames")
                .retrieve()
                .body(String.class);
    }




    public void fetchAchivementsForSteamGame(int steamAppId){
        RestClient client = RestClient.create();

        String result = client.get()
                .uri(uri_base + "/getAchimentForGame")
                .retrieve()
                .body(String.class);
    }
}
