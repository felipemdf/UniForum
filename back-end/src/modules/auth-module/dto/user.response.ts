import { Builder } from "builder-pattern";
import { UserEntity } from "../../../core/entities";
import { COURSE } from "../../../core/entities/enums/Course";

export default class UserResponse {
  id: number;
  username: string;
  email: string;
  course: COURSE;
  period: number;
  photo: string;

  public static from(
    user: UserEntity,
  ): UserResponse {
    const userResponse: UserResponse = Builder(UserResponse)
      .id(user.id)
      .username(user.username)
      .email(user.email)
      .course(user.course)
      .period(user.period)
      .photo(user.photo)
      .build();

   return userResponse;
  }
}
