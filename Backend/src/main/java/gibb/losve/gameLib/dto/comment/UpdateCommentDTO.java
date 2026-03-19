package gibb.losve.gameLib.dto.comment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Schema(description = "DTO for updating an existing comment")
public class UpdateCommentDTO {

        @Id
        private ObjectId id;

        @Field("gameId")
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
}
