package gibb.losve.gameLib.pipeline.steam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvailableGameStatsDto {
    private List<GameStatDto> stats;
}