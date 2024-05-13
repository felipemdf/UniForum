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
  qtdLikes: number;
  createdAt: Date;

  public static from(commentaries: CommentaryEntity[]): CommentaryResponse[] {
    return commentaries.map((c) => {
      return Builder<CommentaryResponse>()
        .id(c.id)
        .content(c.content)
        .user({
          id: c.author.id,
          username: c.author.username,
          photo: c.author.photo,
        })
        .createdAt(c.createdAt)
        .build();
    });
  }
}
