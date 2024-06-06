import * as supertest from "supertest";
import { SuperTest, Test } from "supertest";

import TestAgent from "supertest/lib/agent";
import TestServer from "../src/core/test/test.server";
import { TopicController } from "../src/modules/topic-module/topic-controller";
import { UserRepository } from "../src/modules/auth-module/user.repository";
import { LikeTopicRepository } from "../src/modules/topic-module/like-topic.repository";
import { CommentaryRepository } from "../src/modules/commentary-module/commentary.repository";
import { TopicRepository } from "../src/modules/topic-module/topic.repository";
import { mockTopics, mockTopic1 } from "./__mocks__/topics/getAllTopics";
import {
  mockCommentaryDetails,
  mockTopic,
} from "./__mocks__/topics/getByIdTopic";
import { mockCreateTopic, mockUser } from "./__mocks__/topics/createTopic";

describe("topic.controller.ts", () => {
  let topicRepository: TopicRepository;
  let userRepository: UserRepository;
  let commentaryRepository: CommentaryRepository;
  let likeTopicRepository: LikeTopicRepository;
  let topicController: TopicController;

  let agent: TestAgent<Test>;

  beforeAll((done) => {
    topicRepository = {
      findAll: jest.fn().mockReturnValue([mockTopics, mockTopics.length]),
      findById: jest.fn().mockReturnValue(mockTopic),
      create: jest.fn().mockReturnValue(mockCreateTopic),
      save: jest.fn().mockReturnValue(mockCreateTopic),
    } as unknown as jest.Mocked<TopicRepository>;

    userRepository = {
      findOneByOrFail: jest.fn().mockReturnValue(mockUser),
    } as unknown as jest.Mocked<UserRepository>;

    commentaryRepository = {
      findAll: jest
        .fn()
        .mockReturnValue([
          [mockCommentaryDetails],
          [mockCommentaryDetails].length,
        ]),
    } as unknown as jest.Mocked<CommentaryRepository>;

    likeTopicRepository = {} as unknown as jest.Mocked<LikeTopicRepository>;

    topicController = {} as unknown as jest.Mocked<TopicController>;

    topicController = new TopicController(
      topicRepository,
      userRepository,
      commentaryRepository,
      likeTopicRepository
    );

    jest.mock("typeorm", () => {
      const actualTypeorm = jest.requireActual("typeorm");
      return {
        ...actualTypeorm,
        DataSource: jest.fn(() => ({
          initialize: jest.fn(),
          getRepository: jest.fn(() => ({
            findAll: jest.fn(),
            findById: jest.fn(),
            deleteById: jest.fn(),
            // Mock other methods as needed
          })),
        })),
      };
    });

    const server = new TestServer();
    server.addControllers(topicController);

    agent = supertest.agent(server.getExpressInstance());
    done();
  });

  test("get all topics with success", async () => {
    const { body, status } = await agent.get("/api/topic?page=1");

    expect(status).toEqual(200);

    // Verifica que a estrutura básica está correta
    expect(body).toHaveProperty("pagination");
    expect(body).toHaveProperty("result");

    // Verifica as propriedades de paginação
    expect(body.pagination).toHaveProperty("page", 1);
    expect(body.pagination).toHaveProperty("total", 2);

    // Verifica que o resultado tem dois itens
    expect(body.result).toHaveLength(2);

    // Verifica o primeiro tópico
    const firstResult = body.result[0];
    expect(firstResult).toHaveProperty("course", 1);
    expect(firstResult).toHaveProperty("id", 1);
    expect(firstResult).toHaveProperty("preview", "Content for topic 1");
    expect(firstResult).toHaveProperty("qtComments", 1);
    expect(firstResult).toHaveProperty("tag", 2);
    expect(firstResult).toHaveProperty("title", "Test Topic 1");
    expect(firstResult.user).toHaveProperty("id", 1);
    expect(firstResult.user).toHaveProperty("photo", "photo.png");
    expect(firstResult.user).toHaveProperty("username", "testuser");
    expect(firstResult.usersLikes).toContain(-1);

    // Verifica o segundo tópico
    const secondResult = body.result[1];
    expect(secondResult).toHaveProperty("course", 13);
    expect(secondResult).toHaveProperty("id", 2);
    expect(secondResult).toHaveProperty("preview", "Content for topic 2");
    expect(secondResult).toHaveProperty("qtComments", 1);
    expect(secondResult).toHaveProperty("tag", 2);
    expect(secondResult).toHaveProperty("title", "Test Topic 2");
    expect(secondResult.user).toHaveProperty("id", 1);
    expect(secondResult.user).toHaveProperty("photo", "photo.png");
    expect(secondResult.user).toHaveProperty("username", "testuser");
    expect(secondResult.usersLikes).toContain(-1);
  });

  test("get topic by id with success", async () => {
    const { body, status } = await agent.get("/api/topic/1");

    expect(status).toEqual(200);

    expect(body).toHaveProperty("id", 1);
    expect(body).toHaveProperty("user", {
      id: 1,
      username: "testuser",
      photo: "photo.png",
    });
    expect(body).toHaveProperty("title", "Test Topic 1");
    expect(body).toHaveProperty("content", "Content for topic 1");
    expect(body).toHaveProperty("usersLikes", [1]);
    expect(body).toHaveProperty("qtComments", 1);
    expect(body).toHaveProperty("course", 1);
    expect(body).toHaveProperty("tag", 2);

    expect(body.commentaries).toHaveProperty("pagination");
    expect(body.commentaries).toHaveProperty("result");

    expect(body.commentaries.pagination).toHaveProperty("page", 1);
    expect(body.commentaries.pagination).toHaveProperty("total", 1);

    const commentary = body.commentaries.result[0];
    expect(commentary).toHaveProperty("id", 1);
    expect(commentary).toHaveProperty("user", { id: 1 });
    expect(commentary).toHaveProperty("content", "commentary content");

    expect(commentary).toHaveProperty("usersLikes", [1]);
  });
});
