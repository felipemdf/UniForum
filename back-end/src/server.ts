import "reflect-metadata";

import express from "express";
import cors from "cors";
import datasource from "./data-source";
import { Server } from "@overnightjs/core";
import { DataSource } from "typeorm";
import { IEnvironment } from "./core/config/env.config";
import { AuthController } from "./modules/auth-module/auth.controller";
import errorHandler from "./core/middleware/error-handler";
import { TopicController } from "./modules/topic-module/topic-controller";
import { CommentaryRepository } from "./modules/commentary-module/commentary.repository";
// import { CommentaryController } from "./modules/commentary-module/commentary-controller";
import { TopicRepository } from "./modules/topic-module/topic.repository";
import { CommentaryController } from "./modules/commentary-module/commentary-controller";
import { UserRepository } from "./modules/auth-module/user.repository";
import { LikeTopicRepository } from "./modules/topic-module/like-topic.repository";

export default class SetupServer extends Server {
  private port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  private dataSource: DataSource = datasource;

  constructor(configApp: IEnvironment) {
    super(process.env.NODE_ENV === "development");

    this.setupCors();
    this.setupExpress();
    this.setupControllers();
    this.setupMiddlewares();
  }

  private setupExpress(): void {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  }

  private setupControllers(): void {
    const topicRepository = new TopicRepository();
    const userRepository = new UserRepository();
    const commentaryRepository = new CommentaryRepository();
    const likeTopicRepository = new LikeTopicRepository();

    const authController = new AuthController();
    const topicController = new TopicController(
      topicRepository,
      userRepository,
      commentaryRepository,
      likeTopicRepository
    );
    const commentaryController = new CommentaryController();

    this.addControllers([
      authController,
      topicController,
      commentaryController,
    ]);
  }

  private setupMiddlewares(): void {
    this.app.use(errorHandler);
  }

  private setupCors() {
    this.app.use(
      cors({
        origin: ["http://localhost:8080", "https://uni-forum.netlify.app"],
      })
    );
  }

  public start(): void {
    this.dataSource
      .initialize()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`App listening at http://localhost:${this.port}`);
        });
      })
      .catch((error) => console.log(error));
  }
}
