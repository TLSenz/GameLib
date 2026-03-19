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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "achievements")
public class Achievement {

    @Id
    private ObjectId id;

    @Indexed
    private ObjectId gameId;

    private String title;

    @Nullable
    private String storeSnapshot;

    @Nullable
    private String description;

    @Nullable
    private BigDecimal rarity;
}