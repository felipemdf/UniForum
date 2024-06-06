import { Controller, Delete, Get, Middleware, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../core/bases/base.controller";
import { getArrayNumberFromQueryParam } from "../../core/utils";

import { StatusCodes } from "http-status-codes";
import {
  CommentaryEntity,
  LikeTopicEntity,
  TopicEntity,
} from "../../core/entities";
import verifyToken from "../../core/middleware/auth";

import { QueryRunner } from "typeorm";
import datasource from "../../data-source";
import { TopicRepository } from "./topic.repository";
import { IPageable, TopicResponse } from "./dto/topics.response";
import { TopicDetailsResponse } from "./dto/topic-details.response";
import NotFoundError from "../../core/errors/not-found.error";
import { UserRepository } from "../auth-module/user.repository";
import { CommentaryRepository } from "../commentary-module/commentary.repository";
import { LikeTopicRepository } from "./like-topic.repository";

@Controller("api/topic")
export class TopicController extends BaseController {
  constructor(
    private topicRepository: TopicRepository,
    private userRepository: UserRepository,
    private commentaryRepository: CommentaryRepository,
    private likeTopicRepository: LikeTopicRepository
  ) {
    super();
  }

  @Get("")
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const courses: number[] = getArrayNumberFromQueryParam(
      req.query.courses as string
    );

    const tags: number[] = getArrayNumberFromQueryParam(
      req.query.tags as string
    );

    const search: string = req.query.search as string;
    const orderBy: number = parseInt((req.query.orderBy as string) || "1");
    const page: number = parseInt((req.query.page as string) || "1");

    const topics: [TopicEntity[], number] = await this.topicRepository.findAll(
      courses,
      tags,
      search,
      orderBy,
      page
    );

    const topicsResponse: TopicResponse[] = await TopicResponse.from(topics[0]);
    const response: IPageable<TopicResponse> = {
      pagination: { page: page, total: Math.ceil(topics[1] || 1 / 10) },
      result: topicsResponse,
    };

    res.status(StatusCodes.OK).json(response);
  }

  @Post("")
  @Middleware(verifyToken)
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user = await this.userRepository.findOneByOrFail({
        id: req.body.userId,
      });

      const entity: TopicEntity = this.topicRepository.create({
        title: req.body.title,
        course: req.body.course,
        tag: req.body.course,
        content: req.body.content,
        author: user,
      });

      const createdTopic = await this.topicRepository.save(entity);
      await queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED).send({ id: createdTopic.id });
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await queryRunner.release();
    }
  }

  @Get(":id")
  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id: number = parseInt(req.params.id);
    const orderBy: number = parseInt((req.query.orderBy as string) || "1");

    const topic: TopicEntity = await this.topicRepository.findById(id);
    const commentaries: [CommentaryEntity[], number] =
      await this.commentaryRepository.findAll(topic.id, orderBy, 1);

    const topicResponse: TopicDetailsResponse = await TopicDetailsResponse.from(
      topic,
      commentaries[0],
      1,
      Math.ceil(topic.commentaries[1] || 1 / 10)
    );

    res.status(StatusCodes.OK).json(topicResponse);
  }

  @Delete(":id")
  @Middleware(verifyToken)
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const id: number = parseInt(req.params.id);
      const userId = parseInt(req.userId);

      const result = await this.topicRepository.deleteById(id, userId);
      if (result.affected === 0) {
        throw new NotFoundError("Tópico não encontrado");
      }

      await queryRunner.commitTransaction();
      res.status(StatusCodes.OK).json({ message: "Excluído com sucesso" });
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await queryRunner.release();
    }
  }

  @Post(":id/like")
  @Middleware(verifyToken)
  async like(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: number = parseInt(req.params.id);
    const userId = parseInt(req.userId);

    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const topic: TopicEntity = await this.topicRepository.findOneByOrFail({
        id: id,
      });

      const user = await this.userRepository.findOneByOrFail({
        id: userId,
      });

      const likeExists = await this.likeTopicRepository.existsBy({
        topic: { id: id },
        user: { id: userId },
      });

      if (!likeExists) {
        const entity: LikeTopicEntity = this.likeTopicRepository.create({
          topic: topic,
          user: user,
        });
        await this.likeTopicRepository.save(entity);
      } else {
        await this.likeTopicRepository.deleteBy(id, userId);
      }

      await queryRunner.commitTransaction();
      res.status(StatusCodes.CREATED).json({ message: "Like com sucesso" });
    } catch (error) {
      await queryRunner.rollbackTransaction();

      next(error);
    } finally {
      await queryRunner.release();
    }
  }
}
