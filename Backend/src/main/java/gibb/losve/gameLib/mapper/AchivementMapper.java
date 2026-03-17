package gibb.losve.gameLib.mapper;

import gibb.losve.gameLib.dto.achivement.achivementDTO;
import gibb.losve.gameLib.dto.achivement.createAchivementDTO;
import gibb.losve.gameLib.dto.achivement.updateAchivementDTO;
import gibb.losve.gameLib.dto.comment.commentDTO;
import gibb.losve.gameLib.dto.game.createGameDTO;
import gibb.losve.gameLib.dto.game.gameDTO;
import gibb.losve.gameLib.dto.game.updateGameDTO;
import gibb.losve.gameLib.model.Achievement;
import gibb.losve.gameLib.model.Comment;
import gibb.losve.gameLib.model.Game;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AchivementMapper {

    Achievement toEntity(achivementDTO dto);

    achivementDTO toDTO(Achievement entity);

    Achievement toEntity(createAchivementDTO dto);

    Achievement toEntity(updateAchivementDTO dto);
}

