package gibb.losve.gameLib.mapper;

import gibb.losve.gameLib.dto.achivement.achivementDTO;
import gibb.losve.gameLib.dto.achivement.createAchivementDTO;
import gibb.losve.gameLib.dto.achivement.updateAchivementDTO;
import gibb.losve.gameLib.model.Achievement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AchievementMapper {

    Achievement toEntity(achivementDTO dto);

    achivementDTO toDTO(Achievement entity);

    Achievement toEntity(createAchivementDTO dto);

    Achievement toEntity(updateAchivementDTO dto);
}

