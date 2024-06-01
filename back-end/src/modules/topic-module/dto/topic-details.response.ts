import { Builder } from "builder-pattern";
import { CommentaryEntity, TopicEntity } from "../../../core/entities";
import { IUser } from "../../commentary-module/dto/commentary.response";

export interface IPagination {
  total: number;
  page: number;
}

export interface IPageable<T> {
  result: T[];
  pagination: IPagination;
}

export interface IAuthor {
  id: number;
  username: string;
  photo: string;
}

export interface ICommentary {
  id: number;
  user: IAuthor;
  content: string;
  usersLikes: number[];
  createdAt: Date;
}

export interface IAuthor {
  id: number;
  username: string;
  photo: string;
}

export class TopicDetailsResponse {
  id: number;
  user: IAuthor;
  title: string;
  content: string;
  usersLikes: number[];
  qtComments: number;
  course: number;
  tag: number;
  commentaries: IPageable<ICommentary>;
  createdAt: Date;

  public static async from(
    topic: TopicEntity,
    commentaries: CommentaryEntity[],
    page: number,
    total: number
  ): Promise<TopicDetailsResponse> {
    const userRemoved: IUser = {
      id: -1,
      username: "Usuário removido",
      photo: "",
    };

    const resolvedLikes = await topic.likes;
    const resolvedCommentaries = await topic.commentaries;

    const commentariesResponse = await Promise.all(
      commentaries.map(async (c) => {
        const resolvedCommentLikes = await c.likes;
        return Builder<ICommentary>()
          .id(c.id)
          .content(c.content)
          .usersLikes(
            resolvedCommentLikes.map((l) => (l.user ? l.user.id : -1))
          )
          .user(
            c.author
              ? {
                  id: c.author.id,
                  username: c.author.username,
                  photo: c.author.photo,
                }
              : userRemoved
          )
          .createdAt(c.createdAt)
          .build();
      })
    );

    const pageableCommentaries = Builder<IPageable<ICommentary>>()
      .pagination({ page, total })
      .result(commentariesResponse)
      .build();

    return Builder(TopicDetailsResponse)
      .id(topic.id)
      .user(
        topic.author
          ? {
              id: topic.author.id,
              username: topic.author.username,
              photo: topic.author.photo,
            }
          : userRemoved
      )
      .title(topic.title)
      .content(topic.content)
      .usersLikes(resolvedLikes.map((l) => (l.user ? l.user.id : -1)))
      .qtComments(resolvedCommentaries.length)
      .course(topic.course.valueOf())
      .tag(topic.tag.valueOf())
      .commentaries(pageableCommentaries)
      .createdAt(topic.createdAt)
      .build();
  }

  transformPhoto(photo: Buffer | null): string | null {
    return photo ? photo.toString("base64") : null;
  }
}
