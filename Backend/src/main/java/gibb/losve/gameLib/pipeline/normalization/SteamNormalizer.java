package gibb.losve.gameLib.pipeline.normalization;

import gibb.losve.gameLib.model.Game;
import gibb.losve.gameLib.pipeline.steam.dto.SteamAppDataDto;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class SteamNormalizer {

    public Game mapToInternalGame(SteamAppDataDto dto) {
        if (dto == null) {
            return null;
        }

        Game game = new Game();
        game.setSteamAppId(dto.getSteamAppid());
        game.setTitle(dto.getName());
        game.setDescription(dto.getDetailedDescription());
        game.setShortDescription(dto.getShortDescription());
        game.setStoreSnapshot(dto.getHeaderImage());
        game.setDevelopers(dto.getDevelopers());
        game.setLastUpdateAt(java.time.LocalDate.now());

        // Map platforms
        if (dto.getPlatforms() != null) {
            List<String> platforms = new ArrayList<>();
            if (dto.getPlatforms().isWindows()) platforms.add("Windows");
            if (dto.getPlatforms().isMac()) platforms.add("Mac");
            if (dto.getPlatforms().isLinux()) platforms.add("Linux");
            game.setPlatforms(platforms);
        }

        // Map genres
        if (dto.getGenres() != null) {
            List<String> genres = dto.getGenres().stream()
                    .map(g -> g.getDescription())
                    .filter(d -> d != null && !d.isEmpty())
                    .collect(Collectors.toList());
            game.setGenres(genres);
        }

        // Map metacritic rating
        if (dto.getMetacritic() != null && dto.getMetacritic().getScore() > 0) {
            game.setRating((double) dto.getMetacritic().getScore());
        }

        // Detect DLC
        boolean isDlc = "dlc".equalsIgnoreCase(dto.getType());
        game.setIsDLC(isDlc);

        // Detect early access from categories (category id 70 = Early Access)
        boolean earlyAccess = false;
        if (dto.getCategories() != null) {
            earlyAccess = dto.getCategories().stream()
                    .anyMatch(c -> c.getId() == 70);
        }
        game.setEarlyAccess(earlyAccess);

        // Free games have price 0
        if (dto.isFree()) {
            game.setPrice(BigDecimal.ZERO);
        }

        return game;
    }
}
