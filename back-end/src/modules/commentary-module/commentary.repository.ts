import {
  CommentaryEntity,
  LikeCommentaryEntity,
  TopicEntity,
  UserEntity,
} from "../../core/entities";
import { BaseRepository } from "../../core/bases/base.repository";
import { ORDER_BY } from "../../core/entities/enums/OrderBy";
import { FindOptionsOrder, UpdateResult } from "typeorm";

export class CommentaryRepository extends BaseRepository<CommentaryEntity> {
  constructor() {
    super(CommentaryEntity);
  }

  async findAll(
    idTopic: number,
    orderBy: ORDER_BY,
    page: number
  ): Promise<[CommentaryEntity[], number]> {
    const commentOffset = (page - 1) * 10;
    const query = this.createQueryBuilder("commentary")
      .leftJoinAndSelect("commentary.author", "author")
      .leftJoinAndSelect("commentary.likes", "likes")
      .leftJoin("likes.user", "userLike")
      .select([
        "commentary.id",
        "commentary.content",
        "commentary.createdAt",
        "author.id",
        "author.username",
        "author.photo",
        "likes.id",
        "userLike.id",
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(likes.id)", "likesCount")
          .from(LikeCommentaryEntity, "likes")
          .where("likes.commentaryId = commentary.id");
      }, "likesCount")
      .where("commentary.topicId = :id", { id: idTopic });

    if (orderBy === ORDER_BY.MAIS_RECENTES) {
      query.orderBy("commentary.createdAt", "DESC");
    } else if (orderBy === ORDER_BY.MELHORES) {
      query.orderBy("likesCount", "DESC");
    }

    query.skip(commentOffset).take(10);

    return await query.getManyAndCount();

    // let orderClause: FindOptionsOrder<CommentaryEntity> =
    //   orderBy === ORDER_BY.MAIS_RECENTES
    //     ? { createdAt: "DESC" }
    //     : { qtdLikes: "DESC" };

    // return await this.find({
    //   select: {
    //     id: true,
    //     content: true,
    //     qtdLikes: true,
    //     createdAt: true,
    //     author: {
    //       id: true,
    //       username: true,
    //       photo: true,
    //     },
    //   },
    //   relations: ["author"],
    //   order: orderClause,
    //   where: {
    //     topic: { id: idTopic },
    //   },
    //   take: 10,
    //   skip: 10 * (page - 1),
    // });
  }

  async deleteById(
    idTopic: number,
    idCommentary: number,
    userId: number
  ): Promise<UpdateResult> {
    return this.softDelete({
      id: idCommentary,
      topic: { id: idTopic },
      author: { id: userId },
    });
  }
}
