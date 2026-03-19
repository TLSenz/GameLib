package gibb.losve.gameLib.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "comments")
@Data
public class Comment {

    @Id
    private String id;

    @Indexed
    private String gameId;

    private String title;
    private String comment;
    private LocalDate createdAt;
    private String description;
    private List<String> genres;
    private Double rating;
}
