package gibb.losve.gameLib.pipeline.pipeline;

import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.pipeline.steam.dto.GameList;
import gibb.losve.gameLib.pipeline.steam.dto.GameResponse;
import gibb.losve.gameLib.services.gameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

@Service
public class GameIngestionService {


    @Autowired
    gameService gameService;

    public void ingestGames(Stream<GameList> gameListStream){

    }


    private boolean isGameAlreadyInDB(int SteamAppId){
        try {
            GameDTO game = gameService.getGameBySteamAppId(SteamAppId);
            return game != null;
        } catch (   NoSuchElementException e) {
            return false;
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }

    }

    public static String extractAppId(String url) {
        Pattern pattern = Pattern.compile("/apps/(\\d+)/");
        Matcher matcher = pattern.matcher(url);
        if (matcher.find()) {
            return matcher.group(1);
        }
        return null;
    }

    public





}
