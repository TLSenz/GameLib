package gibb.losve.gameLib.pipeline.steam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;



@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GameResponse {

    private String desc;
    private List<GameList> items;

}
