package gibb.losve.gameLib.dto.game;

import gibb.losve.gameLib.dto.achivement.achivementDTO;
import gibb.losve.gameLib.dto.comment.commentDTO;
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
public class createGameDTO {

    @Id
    @Field("steamAppId")
    private Integer steamAppId;

    private String title;

    private List<String> platforms;

    @Field("storeSnapshot")
    private String storeSnapshot;

    private String description;

    @Field("shortDescription")
    private String shortDescription;

    private List<String> genres;

    private BigDecimal price;

    private List<String> developers;

    private Double rating;

    @Field("releaseDate")
    private LocalDate releaseDate;

    @Field("lastUpdateAt")
    private LocalDate lastUpdateAt;

    @Field("isDLC")
    private Boolean isDLC;

    @Field("baseGameAppId")
    private Integer baseGameAppId;

    @Field("earlyAccess")
    private Boolean earlyAccess;

}
