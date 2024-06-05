import { Builder } from "builder-pattern";
import { COURSE } from "../../../core/entities/enums/Course";
import { UserEntity } from "../../../core/entities";

export default class ProfileResponse {
  user: User;

  public static async from(user: UserEntity): Promise<ProfileResponse> {
    return Builder(ProfileResponse)
      .user(await User.from(user))
      .build();
  }
}

interface Totalizers {
  topics: number;
  likes: number;
  commentaries: number;
}

class User {
  id: number;
  username: string;
  course: COURSE;
  period: number;
  photo: string;
  totalizers: Totalizers;

  public static async from(user: UserEntity): Promise<User> {
    const [topics, likes, commentaries] = await Promise.all([
      user.topics,
      user.likes,
      user.commentaries,
    ]);

    const userResponse: User = Builder(User)
      .id(user.id)
      .username(user.username)
      .course(user.course)
      .period(user.period)
      .photo(user.photo)
      .totalizers({
        topics: topics.length,
        likes: likes.length,
        commentaries: commentaries.length,
      })
      .build();

    return userResponse;
  }
}
