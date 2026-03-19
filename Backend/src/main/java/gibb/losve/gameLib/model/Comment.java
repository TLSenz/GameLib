package gibb.losve.gameLib.model;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.lang.Nullable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "comments")
public class Comment {

    @Id
    private ObjectId id;

    @Indexed
    private ObjectId gameId;

    @Indexed
    private String achievementId;

    private String title;

    private String comment;

    private LocalDateTime createdAt;

    @Nullable
    private String description;

    @Nullable
    private List<String> genres;

    @Nullable
    private BigDecimal bewertung;
}