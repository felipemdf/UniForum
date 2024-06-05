import { Builder } from "builder-pattern";
import { COURSE } from "../../../core/entities/enums/Course";
import { TAG } from "../../../core/entities/enums/Tag";
import { TopicEntity } from "../../../core/entities";
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

export class TopicResponse {
  id: number;
  user: IAuthor;
  title: string;
  preview: string;
  // qtLikes: number;
  usersLikes: number[];
  qtComments: number;
  course: number;
  tag: number;
  createdAt: Date;

  public static async from(topics: TopicEntity[]): Promise<TopicResponse[]> {
    const userRemoved: IUser = {
      id: -1,
      username: "Usuário removido",
      photo: "",
    };

    const topicResponses = await Promise.all(
      topics.map(async (t) => {
        const [likes, commentaries] = await Promise.all([
          t.likes,
          t.commentaries,
        ]);
        
        return Builder(TopicResponse)
          .id(t.id)
          .user(
            t.author
              ? {
                  id: t.author.id,
                  username: t.author.username,
                  photo: t.author.photo,
                }
              : userRemoved
          )
          .title(t.title)
          .preview(t.content.substring(0, 500))
          .usersLikes(likes.map((l) => (l.user ? l.user.id : -1)))
          .qtComments(commentaries.length)
          .course(t.course.valueOf())
          .tag(t.tag.valueOf())
          .createdAt(t.createdAt)
          .build();
      })
    );

    return topicResponses;
  }
}
