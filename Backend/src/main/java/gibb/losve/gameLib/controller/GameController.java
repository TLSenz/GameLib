package gibb.losve.gameLib.controller;


import gibb.losve.gameLib.dto.game.CreateGameDTO;
import gibb.losve.gameLib.dto.game.GameDTO;
import gibb.losve.gameLib.dto.game.UpdateGameDTO;
import gibb.losve.gameLib.services.gameService;
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
@RequestMapping("/games")
@Tag(name = "Games", description = "Game management endpoints")
public class GameController {

    @Autowired
    gameService gameService;


    @Operation(summary = "Get all games", description = "Retrieves a list of games with optional limit")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved games", 
                         content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, 
                         schema = @Schema(implementation = GameDTO.class)))
    })
    @GetMapping
    public ResponseEntity<List<GameDTO>> getAllGames(
            @Parameter(description = "Maximum number of games to return") 
            @RequestParam(defaultValue = "100") int numberOfGames) {
        try {
            return ResponseEntity.ok(gameService.getAllGames(numberOfGames));
        }
        catch (NoSuchFieldError e) {
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Get game by ID", description = "Retrieves a specific game by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game found", 
                         content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE, 
                         schema = @Schema(implementation = GameDTO.class))),
            @ApiResponse(responseCode = "404", description = "Game not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> getGameById(
            @Parameter(description = "Game ID", required = true) @PathVariable String id) {
        try {
            return ResponseEntity.ok(gameService.getGameById(id));
        }
        catch (NoSuchFieldError e) {
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Create a new game", description = "Creates a new game entry")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game created successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> createGame(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Game data to create", 
                required = true,
                content = @Content(schema = @Schema(implementation = CreateGameDTO.class))
            ) @RequestBody CreateGameDTO game) {
        try {
            gameService.createGame(game);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Update a game", description = "Updates an existing game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game updated successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateGame(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Game data to update", 
                required = true,
                content = @Content(schema = @Schema(implementation = UpdateGameDTO.class))
            ) @RequestBody UpdateGameDTO game) {
        try {
            gameService.updateGame(game);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Delete a game", description = "Deletes a game by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game deleted successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGame(
            @Parameter(description = "Game ID to delete", required = true) @PathVariable String id) {
        try {
            gameService.deleteGame(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
