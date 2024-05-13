import { Builder } from "builder-pattern";
import { CommentaryEntity, TopicEntity } from "../../../core/entities";

export interface IPagination {
  total: number;
  page: number;
}

export interface IPageable<T> {
  result: T[];
  pagination: IPagination;
}

export interface IAuthor {
  id: number,
  username: string;
  photo: string;
}

export interface ICommentary {
  id: number;
  user: IAuthor;
  content: string;
  qtLikes: number;
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
  qtLikes: number;
  qtComments: number;
  course: number;
  tag: number;
  commentaries: IPageable<ICommentary>;
  createdAt: Date;

  public static from(topic: TopicEntity, commentaries: CommentaryEntity[], page: number, total: number): TopicDetailsResponse {
    const commentariesResponse = commentaries.map(c => {
      return Builder<ICommentary>()
      .id(c.id)
      .content(c.content)
      .qtLikes(c.qtdLikes)
      .user({id: c.author.id, username: c.author.username, photo: c.author.photo})
      .createdAt(c.createdAt)
      .build();
    });

    const pageableCommentaries = Builder<IPageable<ICommentary>>()
      .pagination({page: page, total: total})
      .result(commentariesResponse)
      .build();

    return Builder(TopicDetailsResponse)
        .id(topic.id)
        .user({ id: topic.author.id, username: topic.author.username, photo: topic.author.photo })
        .title(topic.title)
        .content(topic.content)
        .qtLikes(topic.qtdLikes)
        .qtComments(topic.qtdComments)
        .course(topic.course.valueOf())
        .tag(topic.tag.valueOf())
        .commentaries(pageableCommentaries)
        .createdAt(topic.createdAt)
        .build();
  }
}
