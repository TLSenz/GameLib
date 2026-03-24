package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RequirementsDto {
    private String minimum;
    private String recommended;
}