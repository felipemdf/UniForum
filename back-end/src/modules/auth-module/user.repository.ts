import { UserEntity } from "../../core/entities";
import { BaseRepository } from "../../core/bases/base.repository";

export interface IProfile {
  qtdTopicos: number;
  qtdCurtidas: number;
  qtdComentario: number;
}

export class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  existsByEmailOrUsername({ email, username }): Promise<boolean> {
    return this.exists({
      where: [{ email: email }, { username: username }],
    });
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this.findOne({
      where: { email: email },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
        course: true,
        period: true,
        photo: true,
      },
    });
  }

  async profile(id: number): Promise<any> {
    const query = this.createQueryBuilder("user")
      .leftJoin("user.topics", "topics")
      .leftJoin("user.commentaries", "commentaries")
      .leftJoin("user.likes", "likes")
      .select([
        "user.username",
        "user.course",
        "user.period",
        "user.photo",
        "user.id",
        "topics.id",
        "commentaries.id",
        "likes.id",
      ])
      .where("user.id = :id", { id: id });

    const user = await query.getOne();

    return user;
  }
}
