package gibb.losve.gameLib.mapper;


import gibb.losve.gameLib.dto.game.CreateGameDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.dto.game.UpdateGameDTO;
import gibb.losve.gameLib.model.Game;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GameMapper   {


        Game toEntity(GameDTO dto);

        GameDTO toDTO(Game entity);

        Game toEntity(CreateGameDTO dto);

        Game toEntity(UpdateGameDTO dto);

}
