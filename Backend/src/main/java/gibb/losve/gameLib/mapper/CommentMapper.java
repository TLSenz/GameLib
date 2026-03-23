package gibb.losve.gameLib.mapper;


import gibb.losve.gameLib.dto.comment.CommentDTO;
import gibb.losve.gameLib.dto.comment.CreateCommentDTO;
import gibb.losve.gameLib.dto.comment.UpdateCommentDTO;
import gibb.losve.gameLib.model.Comment;
import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment toEntity(CommentDTO comment);
    CommentDTO toDTO(Comment comment);

    Comment toEntity(CreateCommentDTO dto);
    Comment toEntity(UpdateCommentDTO dto);

    default ObjectId map(String value) {
        return value != null ? new ObjectId(value) : null;
    }

    default String map(ObjectId value) {
        return value != null ? value.toHexString() : null;
    }

    void updateEntityFromDto(UpdateCommentDTO dto, @MappingTarget Comment entity);
}
