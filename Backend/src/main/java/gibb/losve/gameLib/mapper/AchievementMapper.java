package gibb.losve.gameLib.mapper;

import gibb.losve.gameLib.dto.achivement.AchievementDTO;
import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.achivement.UpdateAchievementDTO;
import gibb.losve.gameLib.model.Achievement;
import gibb.losve.gameLib.pipeline.steam.dto.GameStatDto;
import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
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
        return value != null ? value.toString() : null;
    }


    @Mapping(source = "displayName", target = "title")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "icon", target = "storeSnapshot")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "gameId", ignore = true)
    @Mapping(target = "rarity", ignore = true)
    Achievement toAchievement(GameStatDto dto);



    @Mapping(source = "displayName", target = "title")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "icon", target = "storeSnapshot")
    @Mapping(target = "gameId", ignore = true)
    @Mapping(target = "rarity", ignore = true)
    CreateAchievementDTO toCreateAchievement(GameStatDto dto);

}

