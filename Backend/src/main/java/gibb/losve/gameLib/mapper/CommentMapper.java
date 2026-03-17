package gibb.losve.gameLib.mapper;


import gibb.losve.gameLib.dto.comment.CommentDTO;
import gibb.losve.gameLib.dto.comment.CreateCommentDTO;
import gibb.losve.gameLib.dto.comment.UpdateCommentDTO;
import gibb.losve.gameLib.model.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment toEntity(CommentDTO comment);
    CommentDTO toDTO(Comment comment);

    Comment toEntity(CreateCommentDTO dto);
    Comment toEntity(UpdateCommentDTO dto);
}
