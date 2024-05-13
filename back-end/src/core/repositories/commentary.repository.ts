import { CommentaryEntity, TopicEntity, UserEntity } from "../entities";
import { BaseRepository } from "../bases/base.repository";
import { ORDER_BY } from "../entities/enums/OrderBy";
import { FindOptionsOrder } from "typeorm";

export class CommentaryRepository extends BaseRepository<CommentaryEntity> {
  constructor() {
    super(CommentaryEntity);
  }

  async findAll(
    idTopic: number,
    orderBy: ORDER_BY,
    page: number
  ): Promise<CommentaryEntity[]> {
    let orderClause: FindOptionsOrder<CommentaryEntity> =
      orderBy === ORDER_BY.MAIS_RECENTES
        ? { createdAt: "DESC" }
        : { qtdLikes: "DESC" };

    return await this.find({
      select: {
        id: true,
        content: true,
        qtdLikes: true,
        createdAt: true,
        author: {
          username: true,
          photo: true,
        },
      },
      relations: ["author"],
      order: orderClause,
      where: {
        topic: { id: idTopic },
      },
      take: 10,
      skip: 10 * (page - 1),
    });
  }
}
