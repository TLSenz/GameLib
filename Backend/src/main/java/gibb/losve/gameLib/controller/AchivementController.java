package gibb.losve.gameLib.controller;


import gibb.losve.gameLib.dto.achivement.AchievementDTO;
import gibb.losve.gameLib.dto.achivement.CreateAchievementDTO;
import gibb.losve.gameLib.dto.achivement.UpdateAchievementDTO;
import gibb.losve.gameLib.services.achievementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/achivement")
@Tag(name = "Achievements", description = "Achievement management endpoints")
public class AchivementController {

    @Autowired
    achievementService achievementService;

    @Operation(summary = "Get achievements by game ID", description = "Retrieves all achievements for a specific game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Achievements found", 
                         content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, 
                         schema = @Schema(implementation = AchievementDTO.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{gameID}")
    public ResponseEntity<List<AchievementDTO>> getAchievementsByID(
            @Parameter(description = "Game ID", required = true) @PathVariable String gameID) {
        try {
           return ResponseEntity.ok(achievementService.getAchievementsByGameId(String.valueOf(gameID)));
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Create a new achievement", description = "Creates a new achievement for a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Achievement created successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createAchievement(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Achievement data to create", 
                required = true,
                content = @Content(schema = @Schema(implementation = CreateAchievementDTO.class))
            ) @RequestBody CreateAchievementDTO achivement) {
        try {
            achievementService.createAchievement(achivement);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Update an achievement", description = "Updates an existing achievement")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Achievement updated successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateAchievement(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Achievement data to update", 
                required = true,
                content = @Content(schema = @Schema(implementation = UpdateAchievementDTO.class))
            ) @RequestBody UpdateAchievementDTO achivement) {
        try {
            achievementService.updateAchievement(achivement);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Delete an achievement", description = "Deletes an achievement by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Achievement deleted successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping
    public ResponseEntity<Void> deleteAchievement(
            @Parameter(description = "Achievement ID to delete", required = true) @RequestBody String id) {
        try {
            achievementService.deleteAchievement(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
