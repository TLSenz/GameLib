package gibb.losve.gameLib.dto.achivement;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO for creating a new achievement")
public class CreateAchievementDTO {

    @Field("gameId")
    @NonNull
    @Schema(description = "Game ID associated with this achievement", example = "1091500")
    private String gameId;

    @Schema(description = "Achievement title", example = "First Blood")
    private String title;

    @Field("storeSnapshot")
    private String storeSnapshot;

    @Schema(description = "Achievement description", example = "Win your first match")
    private String description;

    @Schema(description = "Achievement rarity percentage", example = "75.5")
    private BigDecimal rarity;
}
