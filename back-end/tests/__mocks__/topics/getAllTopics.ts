import {
  CommentaryEntity,
  LikeTopicEntity,
  TopicEntity,
  UserEntity,
} from "../../../src/core/entities";
import { COURSE } from "../../../src/core/entities/enums/Course";
import { TAG } from "../../../src/core/entities/enums/Tag";

const mockUser: UserEntity = {
  id: 1,
  username: "testuser",
  email: "testemail",
  course: COURSE.ADMINISTRACAO,
  period: 1,
  photo: "photo.png",
  topics: [],
} as unknown as UserEntity;

const mockCommentary: CommentaryEntity = {
  id: 1,
  content: "test comment",
  topic: null,
  author: null,
} as CommentaryEntity;

const mockLike: LikeTopicEntity = {
  id: 1,
  user: null,
  topic: null,
} as LikeTopicEntity;

export const mockTopic1: TopicEntity = {
  id: 1,
  author: mockUser,
  commentaries: Promise.resolve([mockCommentary]),
  likes: Promise.resolve([mockLike]),
  title: "Test Topic 1",
  content: "Content for topic 1",
  course: COURSE.ADMINISTRACAO,
  tag: TAG.ARTIGO,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockTopic2: TopicEntity = {
  id: 2,
  author: mockUser,
  commentaries: Promise.resolve([mockCommentary]),
  likes: Promise.resolve([mockLike]),
  title: "Test Topic 2",
  content: "Content for topic 2",
  course: COURSE.CIENCIAS_CONTABEIS,
  tag: TAG.ARTIGO,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const mockTopics: TopicEntity[] = [mockTopic1, mockTopic2];
