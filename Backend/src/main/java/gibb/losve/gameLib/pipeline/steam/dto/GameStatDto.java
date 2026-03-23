package gibb.losve.gameLib.pipeline.steam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameStatDto {
    private String name;
    private int defaultValue;
    private String displayName;
    private int hidden;
    private String description;
    private String icon;
    private String icongray;
}
