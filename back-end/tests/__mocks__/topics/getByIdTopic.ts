import {
  CommentaryEntity,
  LikeCommentaryEntity,
  LikeTopicEntity,
  TopicEntity,
  UserEntity,
} from "../../../src/core/entities";
import { COURSE } from "../../../src/core/entities/enums/Course";
import { TAG } from "../../../src/core/entities/enums/Tag";

const mockUser: UserEntity = {
  id: 1,
  username: "testuser",
  photo: "photo.png",
} as unknown as UserEntity;

const mockAuthor: UserEntity = {
  id: 1,
} as unknown as UserEntity;

const mockLike: LikeTopicEntity = {
	id: 1,
	user: mockAuthor,
  } as LikeTopicEntity;

const mockCommentary: CommentaryEntity = {
  id: 1,
} as CommentaryEntity;

const mockLikeCommentary: LikeCommentaryEntity = {
  id: 1,
  user: mockAuthor,
  commentary: mockCommentary,
} as LikeCommentaryEntity;

export const mockTopic: TopicEntity = {
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

export const mockCommentaryDetails: CommentaryEntity = {
  id: 1,
  content: "commentary content",
  createdAt: new Date(),
  author: mockAuthor,
  likes: Promise.resolve([mockLikeCommentary]),
} as CommentaryEntity;
