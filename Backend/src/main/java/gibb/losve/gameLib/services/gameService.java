package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.game.createGameDTO;
import gibb.losve.gameLib.dto.game.gameDTO;
import gibb.losve.gameLib.dto.game.updateGameDTO;
import gibb.losve.gameLib.mapper.GameMapper;
import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
public class gameService {

    @Autowired
    GameRepository gameRepository;

    @Autowired
    GameMapper gameMapper;

    List<gameDTO> getAllGames(int numberOfGames) {
        return gameRepository.findAll().stream().map(game -> gameMapper.toDTO(game)).limit(numberOfGames).toList();
    }

    gameDTO getGameById(String id) throws Exception {
        return gameRepository.findById(id).map(game -> gameMapper.toDTO(game)).orElseThrow(() -> new NoSuchElementException("Game not found"));
    }

    void createGame(createGameDTO game) {
        Game mappedGame = gameMapper.toEntity(game);
        gameRepository.save(mappedGame);
    }

    void updateGame(updateGameDTO game) {
        Game updatedGame = gameMapper.toEntity(game);
        gameRepository.save(updatedGame);
    }

    void deleteGame(String id) {
        gameRepository.deleteById(id);
    }
}

