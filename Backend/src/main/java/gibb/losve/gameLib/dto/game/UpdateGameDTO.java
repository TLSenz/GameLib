package gibb.losve.gameLib.dto.game;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO for updating an existing game")
public class UpdateGameDTO {

    @Id
    @Field("steamAppId")
    @Schema(description = "Steam application ID", example = "1091500")
    private Integer steamAppId;

    @Schema(description = "Game title", example = "Cyberpunk 2077")
    private String title;

    @Schema(description = "Available platforms", example = "[\"Windows\", \"Linux\"]")
    private List<String> platforms;

    @Field("storeSnapshot")
    private String storeSnapshot;

    @Schema(description = "Full game description")
    private String description;

    @Field("shortDescription")
    @Schema(description = "Short description of the game", example = "An open-world action-adventure story")
    private String shortDescription;

    @Schema(description = "Game genres", example = "[\"RPG\", \"Action\"]")
    private List<String> genres;

    @Schema(description = "Game price", example = "59.99")
    private BigDecimal price;

    @Schema(description = "Game developers", example = "[\"CD Projekt RED\"]")
    private List<String> developers;

    @Schema(description = "Game rating", example = "8.5")
    private Double rating;

    @Field("releaseDate")
    @Schema(description = "Release date", example = "2020-12-10")
    private LocalDate releaseDate;

    @Field("lastUpdateAt")
    @Schema(description = "Last update date")
    private LocalDate lastUpdateAt;

    @Field("isDLC")
    @Schema(description = "Is this game a DLC", example = "false")
    private Boolean isDLC;

    @Field("baseGameAppId")
    @Schema(description = "Base game app ID if this is a DLC")
    private Integer baseGameAppId;

    @Field("earlyAccess")
    @Schema(description = "Is early access game", example = "false")
    private Boolean earlyAccess;
}
