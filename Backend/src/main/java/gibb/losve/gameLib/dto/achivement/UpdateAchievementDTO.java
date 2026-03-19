package gibb.losve.gameLib.dto.achivement;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO for updating an existing achievement")
public class UpdateAchievementDTO {

    @Id
    @Schema(description = "Achievement ID", example = "507f1f77bcf86cd799439011")
    private String id;

    @Field("gameId")
    @Schema(description = "Game ID associated with this achievement", example = "1091500")
    private Integer gameId;

    @Schema(description = "Achievement title", example = "First Blood")
    private String title;

    @Field("storeSnapshot")
    private String storeSnapshot;

    @Schema(description = "Achievement description", example = "Win your first match")
    private String description;

    @Schema(description = "Achievement rarity percentage", example = "75.5")
    private BigDecimal rarity;
}
