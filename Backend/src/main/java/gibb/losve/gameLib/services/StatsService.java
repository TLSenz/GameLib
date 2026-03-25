package gibb.losve.gameLib.services;

import gibb.losve.gameLib.dto.Stats;
import gibb.losve.gameLib.model.Achievement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsService {


    @Autowired
    gameService gameService;

    @Autowired
    achievementService achievementService;

    @Autowired
    CommentService commentService;



    public Stats getStats() {
        int numberOfGames = gameService.getNumberOfGames();
        int numberOfAchievements = achievementService.getNumberOfAchievements();
        int numberOfComments = commentService.getNumberOfComments();
        return new Stats(numberOfGames, numberOfAchievements, numberOfComments);
    }

}
