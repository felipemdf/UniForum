import { Builder } from "builder-pattern";
import { CommentaryEntity } from "../../../core/entities";

export interface IUser {
  id: number;
  username: string;
  photo: string;
}

export class CommentaryResponse {
  id: number;
  user: IUser;
  content: string;
  usersLikes: number[];
  createdAt: Date;

  public static async from(
    commentaries: CommentaryEntity[]
  ): Promise<CommentaryResponse[]> {
    const commentariesResponse = await Promise.all(
      commentaries.map(async (c) => {
        return Builder<CommentaryResponse>()
          .id(c.id)
          .content(c.content)
          .usersLikes((await c.likes).map((l) => l.user.id))
          .user({
            id: c.author.id,
            username: c.author.username,
            photo: c.author.photo,
          })
          .createdAt(c.createdAt)
          .build();
      })
    );

    return commentariesResponse;
  }
}
