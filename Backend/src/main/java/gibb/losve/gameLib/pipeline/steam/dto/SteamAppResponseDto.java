package gibb.losve.gameLib.pipeline.steam.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Root wrapper
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SteamAppResponseDto {
    @JsonProperty("1172470")
    private SteamAppWrapperDto app;
}
