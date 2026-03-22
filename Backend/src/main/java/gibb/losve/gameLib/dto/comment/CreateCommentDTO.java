package gibb.losve.gameLib.dto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO for creating a new comment")
public class CreateCommentDTO {

    @Field("gameId")
    @NotNull
    @Schema(description = "Game ID associated with this comment", example = "1091500")
    private Integer gameId;

    @Field("achievementId")
    @Schema(description = "Achievement ID associated with this comment")
    private String achievementId;

    @Schema(description = "Comment title", example = "Great game!")
    private String title;

    @Schema(description = "Comment text", example = "This game is amazing!")
    private String comment;

    @Field("createdAt")
    @Schema(description = "Creation timestamp")
    private LocalDateTime createdAt;

    @Schema(description = "Additional description")
    private String description;

    @Schema(description = "Related genres")
    private List<String> genres;

    @Schema(description = "User rating", example = "9.0")
    private BigDecimal bewertung;
}
