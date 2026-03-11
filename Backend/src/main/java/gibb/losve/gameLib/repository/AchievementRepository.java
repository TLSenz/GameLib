package gibb.losve.gameLib.repository;

import gibb.losve.gameLib.model.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AchievementRepository extends MongoRepository<Achievement, String> {

    List<Achievement> findByGameId(String gameId);

    void deleteByGameId(String gameId);
}
