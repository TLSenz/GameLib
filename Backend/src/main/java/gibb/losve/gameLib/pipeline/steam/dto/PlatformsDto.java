package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PlatformsDto {
    private boolean windows;
    private boolean mac;
    private boolean linux;
}