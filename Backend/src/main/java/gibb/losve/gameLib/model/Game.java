package gibb.losve.gameLib.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "games")
@Data
public class Game {

    @Id
    private String id;

    @Indexed(unique = true)
    private Integer steamAppId;

    private String title;
    private List<String> platforms;
    private String storeSnapshot;
    private String description;
    private String shortDescription;
    private List<String> genres;
    private Double price;
    private List<String> developers;
    private Double rating;
    private LocalDate releaseDate;
    private LocalDate lastUpdateAt;
    private boolean earlyAccess;
}
