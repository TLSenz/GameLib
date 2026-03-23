package gibb.losve.gameLib.pipeline.steam.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SteamApiListItemResponse {
    private long id;
    private int type;
    private String name;

    private boolean discounted;

    @JsonProperty("discount_percent")
    private int discountPercent;

    @JsonProperty("original_price")
    private int originalPrice;

    @JsonProperty("final_price")
    private int finalPrice;

    private String currency;

    @JsonProperty("large_capsule_image")
    private String largeCapsuleImage;

    @JsonProperty("small_capsule_image")
    private String smallCapsuleImage;

    @JsonProperty("header_image")
    private String headerImage;

    @JsonProperty("windows_available")
    private boolean windowsAvailable;

    @JsonProperty("mac_available")
    private boolean macAvailable;

    @JsonProperty("linux_available")
    private boolean linuxAvailable;

    @JsonProperty("streamingvideo_available")
    private boolean streamingvideoAvailable;

    @JsonProperty("discount_expiration")
    private long discountExpiration;

    @JsonProperty("controller_support")
    private String controllerSupport;
}
