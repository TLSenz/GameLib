package gibb.losve.gameLib.mapper;

import gibb.losve.gameLib.dto.achivement.AchievementDTO;
import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.achivement.UpdateAchievementDTO;
import gibb.losve.gameLib.model.Achievement;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AchievementMapper {

    Achievement toEntity(AchievementDTO dto);

    AchievementDTO toDTO(Achievement entity);

    Achievement toEntity(CreateAchievementDTO dto);

    Achievement toEntity(UpdateAchievementDTO dto);
}

