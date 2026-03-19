package gibb.losve.gameLib.repository;

import gibb.losve.gameLib.model.Comment;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {


    List<Comment> findByAchievementId(ObjectId achievementId);

    List<Comment> findByGameId(ObjectId gameId);

    void deleteByGameId(String gameId);
}
