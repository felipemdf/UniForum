import { LikeTopicEntity } from "../../core/entities";
import { BaseRepository } from "../../core/bases/base.repository";
import { DeleteResult, UpdateResult } from "typeorm";

export class LikeTopicRepository extends BaseRepository<LikeTopicEntity> {
  constructor() {
    super(LikeTopicEntity);
  }

  async findByTopicIdAndUserId(
    topicId: number,
    userId: number
  ): Promise<LikeTopicEntity> {
    return this.findOneOrFail({
      where: { topic: { id: topicId }, user: { id: userId } },
    });
  }

  async deleteBy(topicId: number, userId: number): Promise<DeleteResult> {
    return this.delete({ topic: { id: topicId }, user: { id: userId } });
  }
}
