package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.game.CreateGameDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.dto.game.UpdateGameDTO;
import gibb.losve.gameLib.mapper.GameMapper;
import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class gameService {

    @Autowired
    GameRepository gameRepository;

    @Autowired
    GameMapper gameMapper;

   public List<GameDTO> getAllGames(int numberOfGames) {
        return gameRepository.findAll().stream().map(game -> gameMapper.toDTO(game)).limit(numberOfGames).toList();
    }

    public GameDTO getGameById(String id) throws Exception {
        return gameRepository.findById(id).map(game -> gameMapper.toDTO(game)).orElseThrow(() -> new NoSuchElementException("Game not found"));
    }

    public void createGame(CreateGameDTO game) {
        Game mappedGame = gameMapper.toEntity(game);
        gameRepository.save(mappedGame);
    }

   public void updateGame(UpdateGameDTO game) {
        Game updatedGame = gameMapper.toEntity(game);
        gameRepository.save(updatedGame);
    }

   public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }
}

