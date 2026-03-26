package gibb.losve.gameLib.services;


import gibb.losve.gameLib.dto.comment.CommentDTO;
import gibb.losve.gameLib.dto.comment.CreateCommentDTO;
import gibb.losve.gameLib.dto.comment.UpdateCommentDTO;
import gibb.losve.gameLib.mapper.CommentMapper;
import gibb.losve.gameLib.model.Comment;
import gibb.losve.gameLib.repository.CommentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.openmbean.KeyAlreadyExistsException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    achievementService achievementService;

    @Autowired
    CommentMapper commentMapper;

    @Autowired
    gameService gameService;

    public List<CommentDTO> getAllComments(int numberOfComments) {
        return commentRepository.findAll().stream()
                .map(comment -> commentMapper.toDTO(comment))
                .limit(numberOfComments)
                .toList();
    }

    public List<CommentDTO> getCommentById(String id) {
        return commentRepository.findByGameId(new ObjectId(id)).stream()
                .map(comments -> commentMapper.toDTO(comments)).toList();
    }

    public List<CommentDTO> getCommentsByGameId(String gameId) {
        return commentRepository.findByGameId(new ObjectId(gameId)).stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    public int getNumberOfComments(){
        return Math.toIntExact(commentRepository.count());
    }

    public List<CommentDTO> getCommentsByAchievementId(String achievementId) {
        return commentRepository.findByAchievementId(new ObjectId(achievementId)).stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    public void createCommentAchievement(CreateCommentDTO comment) {
        if (achievementService.doesAchievementExist(comment.getAchievementId())) {
            Comment mappedComment = commentMapper.toEntity(comment);
            commentRepository.save(mappedComment);
        }
        else {
            throw new KeyAlreadyExistsException();
        }


    }

    public void     createCommentGame(CreateCommentDTO comment) {

        if (comment.getGameId() != null) {
            if (gameService.doesGameExist(comment.getGameId())){
                Comment mappedComment = commentMapper.toEntity(comment);
                commentRepository.save(mappedComment);
            }
            else {
                throw new  KeyAlreadyExistsException();
            }
        }
        else if(comment.getAchievementId() != null){
            if (achievementService.doesAchievementExist(comment.getAchievementId())){
                Comment mappedComment = commentMapper.toEntity(comment);
                commentRepository.save(mappedComment);
            }
            else {
                throw new  KeyAlreadyExistsException();
            }
        }
        else {
            throw new  KeyAlreadyExistsException();
        }


    }

    public void updateComment(UpdateCommentDTO comment) {
        Comment existing = commentRepository
                .findById(comment.getId().toString())
                .orElseThrow(() -> new NoSuchElementException("Issue"));

        commentMapper.updateEntityFromDto(comment, existing);

        commentRepository.save(existing);
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
