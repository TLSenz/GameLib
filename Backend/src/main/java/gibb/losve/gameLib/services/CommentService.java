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

import java.util.List;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    CommentMapper commentMapper;

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

    public List<CommentDTO> getCommentsByAchievementId(String achievementId) {
        return commentRepository.findByAchievementId(achievementId).stream()
                .map(comment -> commentMapper.toDTO(comment))
                .toList();
    }

    public void createComment(CreateCommentDTO comment) {
        Comment mappedComment = commentMapper.toEntity(comment);
        commentRepository.save(mappedComment);
    }

   public void updateComment(UpdateCommentDTO comment) {
        Comment updatedComment = commentMapper.toEntity(comment);
        commentRepository.save(updatedComment);
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
