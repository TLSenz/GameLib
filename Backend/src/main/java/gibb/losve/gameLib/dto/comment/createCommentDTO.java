package gibb.losve.gameLib.dto.comment;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class createCommentDTO {

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
