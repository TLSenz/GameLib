package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SteamAppDataDto {
    private String type;
    private String name;

    @JsonProperty("steam_appid")
    private int steamAppid;

    @JsonProperty("required_age")
    private int requiredAge;

    @JsonProperty("is_free")
    private boolean isFree;

    @JsonProperty("controller_support")
    private String controllerSupport;

    @JsonProperty("detailed_description")
    private String detailedDescription;

    @JsonProperty("about_the_game")
    private String aboutTheGame;

    @JsonProperty("short_description")
    private String shortDescription;

    @JsonProperty("supported_languages")
    private String supportedLanguages;

    private String reviews;

    @JsonProperty("header_image")
    private String headerImage;

    @JsonProperty("capsule_image")
    private String capsuleImage;

    @JsonProperty("capsule_imagev5")
    private String capsuleImageV5;

    private String website;

    @JsonProperty("legal_notice")
    private String legalNotice;

    @JsonProperty("ext_user_account_notice")
    private String extUserAccountNotice;

    private List<String> developers;
    private List<String> publishers;

    @JsonProperty("package_groups")
    private List<Object> packageGroups;

    private PlatformsDto platforms;
    private MetacriticDto metacritic;

    private List<CategoryDto> categories;
    private List<GenreDto> genres;
    private List<ScreenshotDto> screenshots;

}