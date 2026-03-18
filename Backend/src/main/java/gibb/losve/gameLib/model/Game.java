package gibb.losve.gameLib.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.lang.Nullable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "games")
public class Game {

    @Id
    private String id; // MongoDB auto-generated ObjectId

    private String steamAppId; // no longer the @Id

    @Nullable
    private String title;

    @Nullable
    private List<String> platforms;

    @Nullable
    private String storeSnapshot;

    @Nullable
    private String description;

    @Nullable
    private String shortDescription;

    @Nullable
    private List<String> genres;

    @Nullable
    private BigDecimal price;

    @Nullable
    private List<String> developers;

    @Nullable
    private Double rating;

    @Nullable
    private LocalDate releaseDate;

    @Nullable
    private LocalDate lastUpdateAt;

    @Nullable
    private Boolean isDLC;

    @Nullable
    private Integer baseGameAppId;

    @Nullable
    private Boolean earlyAccess;
}