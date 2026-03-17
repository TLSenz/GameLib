package gibb.losve.gameLib.dto.achivement;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class createAchivementDTO {

    @Field("gameId")
    private Integer gameId;

    private String title;

    @Field("storeSnapshot")
    private String storeSnapshot;

    private String description;

    private BigDecimal rarity;
}
