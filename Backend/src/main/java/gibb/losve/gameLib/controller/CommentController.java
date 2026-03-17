package gibb.losve.gameLib.controller;


import gibb.losve.gameLib.dto.comment.CommentDTO;
import gibb.losve.gameLib.dto.comment.CreateCommentDTO;
import gibb.losve.gameLib.dto.comment.UpdateCommentDTO;
import gibb.losve.gameLib.services.CommentService;
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
@RequestMapping("/comments")
@Tag(name = "Comments", description = "Comment management endpoints")
public class CommentController {

    @Autowired
    CommentService commentService;


    @Operation(summary = "Get comments by game ID", description = "Retrieves all comments for a specific game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comments found",
                         content = @Content(mediaType = MediaType.APPLICATION_JSON_VALUE,
                         schema = @Schema(implementation = CommentDTO.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{gameID}")
    public ResponseEntity<List<CommentDTO>> getComments(
            @Parameter(description = "Game ID", required = true) @PathVariable int gameID) {
        try {
           return ResponseEntity.ok(commentService.getCommentById(String.valueOf(gameID)));
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Create a new comment", description = "Creates a new comment for a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment created successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<Void> createComment(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Comment data to create",
                required = true,
                content = @Content(schema = @Schema(implementation = CreateCommentDTO.class))
            ) @RequestBody CreateCommentDTO comment) {
        try {
            commentService.createComment(comment);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Update a comment", description = "Updates an existing comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment updated successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateComment(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                description = "Comment data to update",
                required = true,
                content = @Content(schema = @Schema(implementation = UpdateCommentDTO.class))
            ) @RequestBody UpdateCommentDTO comment) {
        try {
            commentService.updateComment(comment);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @Operation(summary = "Delete a comment", description = "Deletes a comment by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment deleted successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @DeleteMapping
    public ResponseEntity<Void> deleteComment(
            @Parameter(description = "Comment ID to delete", required = true) @RequestBody String id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
