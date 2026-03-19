package gibb.losve.gameLib.mapper;

import gibb.losve.gameLib.dto.achivement.AchievementDTO;
import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.achivement.UpdateAchievementDTO;
import gibb.losve.gameLib.model.Achievement;
import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AchievementMapper {

    Achievement toEntity(AchievementDTO dto);

    AchievementDTO toDTO(Achievement entity);

    Achievement toEntity(CreateAchievementDTO dto);

    void updateEntityFromDto(UpdateAchievementDTO dto,
                             @MappingTarget Achievement entity);

    Achievement toEntity(UpdateAchievementDTO dto);
    default ObjectId map(String value) {
        return value != null ? new ObjectId(value) : null;
    }

    default String map(ObjectId value) {
        return value != null ? value.toHexString() : null;
    }

}

