import { ChildEntity, ManyToOne } from "typeorm";
import { CommentaryEntity, LikeEntity } from "./index";

@ChildEntity("commentary")
export class LikeCommentaryEntity extends LikeEntity {
  @ManyToOne(() => CommentaryEntity, (commentary) => commentary.likes)
  commentary: CommentaryEntity;
}
