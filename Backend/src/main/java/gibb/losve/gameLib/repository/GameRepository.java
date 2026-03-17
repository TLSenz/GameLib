package gibb.losve.gameLib.repository;

import gibb.losve.gameLib.dto.game.gameDTO;
import gibb.losve.gameLib.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {



    Optional<Game> findBySteamAppId(Integer steamAppId);

    List<Game> findByTitleContainingIgnoreCase(String title);

    List<Game> findByGenresContaining(String genre);

    List<Game> findByDevelopersContaining(String developer);
}
