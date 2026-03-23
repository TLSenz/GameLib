package gibb.losve.gameLib.pipeline.steam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {
    private String gameName;
    private String gameVersion;
    private AvailableGameStatsDto availableGameStats;
}