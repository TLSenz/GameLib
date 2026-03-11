package gibb.losve.gameLib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "games")
public class Game {

    @Id
    private String id;

    @Indexed(unique = true)
    private Integer steamAppId;

    private String title;
    private List<String> platforms;
    private String storeSnapshot;
    private String description;
    private String shortDescription;
    private List<String> genres;
    private Double price;
    private List<String> developers;
    private Double rating;
    private LocalDate releaseDate;
    private LocalDate lastUpdateAt;

    public Game() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getSteamAppId() {
        return steamAppId;
    }

    public void setSteamAppId(Integer steamAppId) {
        this.steamAppId = steamAppId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getPlatforms() {
        return platforms;
    }

    public void setPlatforms(List<String> platforms) {
        this.platforms = platforms;
    }

    public String getStoreSnapshot() {
        return storeSnapshot;
    }

    public void setStoreSnapshot(String storeSnapshot) {
        this.storeSnapshot = storeSnapshot;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<String> getDevelopers() {
        return developers;
    }

    public void setDevelopers(List<String> developers) {
        this.developers = developers;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public LocalDate getLastUpdateAt() {
        return lastUpdateAt;
    }

    public void setLastUpdateAt(LocalDate lastUpdateAt) {
        this.lastUpdateAt = lastUpdateAt;
    }
}
