import { LikeCommentaryEntity, LikeTopicEntity } from "../../core/entities";
import { BaseRepository } from "../../core/bases/base.repository";
import { DeleteResult, UpdateResult } from "typeorm";

export class LikeCommentaryRepository extends BaseRepository<LikeCommentaryEntity> {
  constructor() {
    super(LikeCommentaryEntity);
  }

  async findByCommentaryIdAndUserId(
    commentaryId: number,
    userId: number
  ): Promise<LikeCommentaryEntity> {
    return this.findOneOrFail({
      where: { commentary: { id: commentaryId }, user: { id: userId } },
    });
  }

  async deleteBy(commentaryId: number, userId: number): Promise<DeleteResult> {
    return this.delete({
      commentary: { id: commentaryId },
      user: { id: userId },
    });
  }
}
