import { TopicEntity, UserEntity } from "../entities";
import { BaseRepository } from "../bases/base.repository";
import { ORDER_BY } from "../entities/enums/OrderBy";
import { COURSE } from "../entities/enums/Course";
import { TAG } from "../entities/enums/Tag";
import { FindManyOptions, FindOptionsOrder, In, Like, Or } from "typeorm";

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
  ): Promise<TopicEntity[]> {
    let orderClause: FindOptionsOrder<TopicEntity> =
      orderBy === ORDER_BY.MAIS_RECENTES
        ? { createdAt: "DESC" }
        : { qtdLikes: "DESC" };

    return await this.find({
      select: {
        id: true,
        title: true,
        content: true,
        course: true,
        tag: true,
        qtdLikes: true,
        qtdComments: true,
        createdAt: true,
        author: {
          username: true,
          photo: true,
        },
      },
      relations: ["author"],
      order: orderClause,
      where: {
        course: courses.length > 0 ? In(courses) : undefined,
        tag: tags.length > 0 ? In(tags) : undefined,
        content:
          search && search.trim().length > 0 ? Like(`%${search}%`) : undefined,
      },
      take: 10,
      skip: 10 * (page - 1),
    });
  }
}
