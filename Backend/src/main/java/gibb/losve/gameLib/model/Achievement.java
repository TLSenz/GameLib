package gibb.losve.gameLib.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "achievements")
public class Achievement {

    @Id
    private String id;

    @Indexed
    private String gameId;

    private String title;
    private String storeSnapshot;

    public Achievement() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStoreSnapshot() {
        return storeSnapshot;
    }

    public void setStoreSnapshot(String storeSnapshot) {
        this.storeSnapshot = storeSnapshot;
    }
}
