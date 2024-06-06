import { TopicEntity, UserEntity } from "../../../src/core/entities";
import { COURSE } from "../../../src/core/entities/enums/Course";

export const mockUser: UserEntity = {
  id: 1,
  email: "test@example.com",
  username: "testuser",
  password: "hashedpassword",
  course: COURSE.ADMINISTRACAO,
  period: 1,
  photo: "base64encodedstring",
  topics: Promise.resolve([]),
  commentaries: Promise.resolve([]),
  likes: Promise.resolve([]),
} as unknown as UserEntity;

export const mockCreateTopic: TopicEntity = {
  id: 1,
  title: "Teste",
  course: "10",
  tag: "5",
  content: "Este é um exemplo de teste",
  author: mockUser,
} as unknown as TopicEntity;
