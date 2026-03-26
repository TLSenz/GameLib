package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ScreenshotDto {
    private int id;

    @JsonProperty("path_thumbnail")
    private String pathThumbnail;

    @JsonProperty("path_full")
    private String pathFull;
}