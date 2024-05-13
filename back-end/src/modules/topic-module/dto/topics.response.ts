import { Builder } from "builder-pattern";
import { COURSE } from "../../../core/entities/enums/Course";
import { TAG } from "../../../core/entities/enums/Tag";
import { TopicEntity } from "../../../core/entities";

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
  qtLikes: number;
  qtComments: number;
  course: number;
  tag: number;
  createdAt: Date;

  public static from(topics: TopicEntity[]): TopicResponse[] {
    return topics.map((t) => {
      return Builder(TopicResponse)
        .id(t.id)
        .user({ id:t.author.id, username: t.author.username, photo: t.author.photo })
        .title(t.title)
        .preview(t.content.substring(0, 500))
        .qtLikes(t.qtdLikes)
        .qtComments(t.qtdComments)
        .course(t.course.valueOf())
        .tag(t.tag.valueOf())
        .createdAt(t.createdAt)
        .build();
    });
  }
}
