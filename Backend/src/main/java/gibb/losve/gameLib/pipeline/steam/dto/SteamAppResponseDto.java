package gibb.losve.gameLib.pipeline.steam.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

// Root wrapper - Steam appdetails returns { "<appId>": { success: ..., data: ... } }
// Use a Map<String, SteamAppWrapperDto> at call site to handle dynamic key
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SteamAppResponseDto {
    private String appId;
    private SteamAppWrapperDto wrapper;
}
