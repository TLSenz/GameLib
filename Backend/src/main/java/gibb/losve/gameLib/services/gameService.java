package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.game.CreateGameDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.dto.game.UpdateGameDTO;
import gibb.losve.gameLib.mapper.GameMapper;
import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public List<GameDTO> getAllGames(int numberOfGames) {
        return gameRepository.findAll().stream().map(game -> gameMapper.toDTO(game)).limit(numberOfGames).toList();
    }

    public Page<GameDTO> getAllGames(Pageable pageable) {
        return gameRepository.findAll(pageable).map(gameMapper::toDTO);
    }

    public List<GameDTO> searchGamesByTitle(String title) {
        return gameRepository.findByTitleContainingIgnoreCase(title)
                .stream().map(gameMapper::toDTO).toList();
    }

    public GameDTO getGameBySteamAppId(int steamAppId) {
        return gameRepository.findBySteamAppId(steamAppId).map(game -> gameMapper.toDTO(game)).orElseThrow(() -> new NoSuchElementException("Game Not Found"));
    }

    public GameDTO getGameById(String id) throws Exception {
        return gameRepository.findById(id).map(game -> gameMapper.toDTO(game)).orElseThrow(() -> new NoSuchElementException("Game not found"));
    }

    public void createGame(CreateGameDTO game) {
        Game mappedGame = gameMapper.toEntity(game);
        gameRepository.save(mappedGame);
    }

    public void updateGame(UpdateGameDTO game) {
        Game existing = gameRepository
                .findBySteamAppId(game.getSteamAppId())
                .orElseThrow(NoSuchElementException::new);

        gameMapper.updateEntityFromDto(game,existing);
        Game updatedGame = gameMapper.toEntity(game);
        gameRepository.save(updatedGame);
    }


    public boolean doesGameExist(String id){
        Optional<Game> existing = gameRepository.findById(id);
        return existing.isPresent();
    }

    public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }
}

