package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SteamAppWrapperDto {
    private boolean success;
    private SteamAppDataDto data;
}