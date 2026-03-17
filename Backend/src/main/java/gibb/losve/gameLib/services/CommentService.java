package gibb.losve.gameLib.services;


import gibb.losve.gameLib.dto.comment.commentDTO;
import gibb.losve.gameLib.dto.comment.createCommentDTO;
import gibb.losve.gameLib.dto.comment.updateCommentDTO;
import gibb.losve.gameLib.mapper.AchivementMapper;
import gibb.losve.gameLib.mapper.CommentMapper;
import gibb.losve.gameLib.model.Comment;
import gibb.losve.gameLib.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentMapper commentMapper;

    List<commentDTO> getAllComments(int numberOfComments) {
        return commentRepository.findAll().stream()
                .map(comment -> commentMapper.toDTO(comment))
                .limit(numberOfComments)
                .toList();
    }

    commentDTO getCommentById(String id) {
        return commentRepository.findById(id)
                .map(comment -> commentMapper.toDTO(comment))
                .orElseThrow(() -> new NoSuchElementException("Comment not found"));
    }

    List<commentDTO> getCommentsByGameId(String gameId) {
        return commentRepository.findByGameId(gameId).stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    List<commentDTO> getCommentsByAchievementId(String achievementId) {
        return commentRepository.findByAchievementId(achievementId).stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    void createComment(createCommentDTO comment) {
        Comment mappedComment = commentMapper.toEntity(comment);
        commentRepository.save(mappedComment);
    }

    void updateComment(updateCommentDTO comment) {
        Comment updatedComment = commentMapper.toEntity(comment);
        commentRepository.save(updatedComment);
    }

    void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
