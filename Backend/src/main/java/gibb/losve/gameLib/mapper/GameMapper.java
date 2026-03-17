package gibb.losve.gameLib.mapper;


import gibb.losve.gameLib.dto.game.createGameDTO;
import gibb.losve.gameLib.dto.game.gameDTO;
import gibb.losve.gameLib.dto.game.updateGameDTO;
import gibb.losve.gameLib.model.Game;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GameMapper   {


        Game toEntity(gameDTO dto);

        gameDTO toDTO(Game entity);

        Game toEntity(createGameDTO dto);

        Game toEntity(updateGameDTO dto);

}
