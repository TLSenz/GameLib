package gibb.losve.gameLib.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class commentDTO {
    @Id
    private String id;

    @Field("gameId")
    private Integer gameId;

    @Field("achievementId")
    private String achievementId;

    private String title;

    private String comment;

    @Field("createdAt")
    private LocalDateTime createdAt;

    private String description;

    private List<String> genres;

    private BigDecimal bewertung;
}
