import { Repository } from "typeorm";
import { UserEntity } from "../entities";
import datasource from "../../data-source";
import { BaseRepository } from "../bases/base.repository";

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
}
