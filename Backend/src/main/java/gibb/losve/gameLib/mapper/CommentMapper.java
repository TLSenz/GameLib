package gibb.losve.gameLib.mapper;


import gibb.losve.gameLib.dto.comment.commentDTO;
import gibb.losve.gameLib.dto.comment.createCommentDTO;
import gibb.losve.gameLib.dto.comment.updateCommentDTO;
import gibb.losve.gameLib.model.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment toEntity(commentDTO comment);
    commentDTO toDTO(Comment comment);

    Comment toEntity(createCommentDTO dto);
    Comment toEntity(updateCommentDTO dto);
}
