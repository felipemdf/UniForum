import { Builder } from "builder-pattern";
import { UserEntity } from "../../../core/entities";
import UserResponse from "./user.response";

export default class AuthResponse {
  user: UserResponse;
  token: string;
  refreshToken: string;

  public static from(
    user: UserEntity,
    token: string,
    refreshToken: string
  ): AuthResponse {
    const userResponse: UserResponse = Builder(UserResponse)
      .id(user.id)
      .username(user.username)
      .email(user.email)
      .course(user.course)
      .period(user.period)
      .photo(user.photo)
      .build();

    return Builder(AuthResponse)
      .user(userResponse)
      .token(token)
      .refreshToken(refreshToken)
      .build();
  }
}
