package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GameStatDto {
    private String name;
    @JsonProperty("defaultvalue")
    private int defaultValue;
    private String displayName;
    private int hidden;
    private String description;
    private String icon;
    private String icongray;
}
