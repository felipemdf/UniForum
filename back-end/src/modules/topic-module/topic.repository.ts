import { UpdateResult } from "typeorm";
import { CommentaryEntity, LikeEntity, TopicEntity } from "../../core/entities";
import { BaseRepository } from "../../core/bases/base.repository";
import { COURSE } from "../../core/entities/enums/Course";
import { TAG } from "../../core/entities/enums/Tag";
import { ORDER_BY } from "../../core/entities/enums/OrderBy";

export class TopicRepository extends BaseRepository<TopicEntity> {
  constructor() {
    super(TopicEntity);
  }

  async findAll(
    courses: COURSE[],
    tags: TAG[],
    search: string,
    orderBy: ORDER_BY,
    page: number
  ): Promise<[TopicEntity[], number]> {
    const query = this.createQueryBuilder("topic")
      .leftJoin("topic.author", "author")
      .leftJoin("topic.commentaries", "commentaries")
      .leftJoin("topic.likes", "likes")
      .leftJoin("likes.user", "userLike")
      .select([
        "topic.id",
        "topic.title",
        "topic.content",
        "topic.course",
        "topic.tag",
        "topic.createdAt",
        "author.id",
        "author.username",
        "author.photo",
        "commentaries.id",
        "likes.id",
        "userLike.id",
      ])

      .addSelect((subQuery) => {
        return subQuery
          .select("COUNT(likes.id)", "likeCount")
          .from(LikeEntity, "likes")
          .where("likes.topicId = topic.id");
      }, "likesCount");

    if (search)
      query.andWhere("topic.content LIKE :search", { search: `%${search}%` });

    if (tags && tags.length > 0)
      query.andWhere("topic.tag IN (:...tags)", { tags });

    if (courses && courses.length > 0)
      query.andWhere("topic.course IN (:...courses)", { courses });

    if (orderBy === ORDER_BY.MAIS_RECENTES) {
      query.orderBy("topic.createdAt", "DESC");
    } else if (orderBy === ORDER_BY.MELHORES) {
      query.orderBy("likesCount", "DESC");
    }

    // Adicionando paginação
    const offset = (page - 1) * 10;
    query.skip(offset).take(10);

    const topics = await query.getManyAndCount();
    return topics;
  }

  async findById(id: number): Promise<TopicEntity> {
    const query = this.createQueryBuilder("topic")
      .leftJoin("topic.author", "author")
      .leftJoin("topic.commentaries", "commentaries")
      .leftJoin("topic.likes", "likes")
      .leftJoin("likes.user", "userLike")
      .select([
        "topic.id",
        "topic.title",
        "topic.content",
        "topic.course",
        "topic.tag",
        "topic.createdAt",
        "author.id",
        "author.username",
        "author.photo",
        "commentaries.id",
        "likes.id",
        "userLike.id",
      ])
      .where("topic.id = :id", { id: id });

    const topic = await query.getOneOrFail();
    return topic;
  }

  async deleteById(id: number, userId: number): Promise<UpdateResult> {
    return this.softDelete({ id: id, author: { id: userId } });
  }

  // async addLike(
  //   id: number,
  //   userId: number,
  //   qtdLikes: number
  // ): Promise<UpdateResult> {
  //   return this.update(
  //     { id: id, author: { id: userId } },
  //     { qtdLikes: qtdLikes + 1 }
  //   );
  // }

  // async removeLike(
  //   id: number,
  //   userId: number,
  //   qtdLikes: number
  // ): Promise<UpdateResult> {
  //   return this.update(
  //     { id: id, author: { id: userId } },
  //     { qtdLikes: qtdLikes - 1 }
  //   );
  // }
}
