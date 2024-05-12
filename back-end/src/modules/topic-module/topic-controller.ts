import {
  ClassMiddleware,
  Controller,
  Get,
  Middleware,
  Post,
} from "@overnightjs/core";
import { BaseController } from "../../core/bases/base.controller";
import { NextFunction, Request, Response } from "express";
import { TopicRepository, UserRepository } from "../../core/repositories";
import { getArrayNumberFromQueryParam } from "../../core/utils";
import { ORDER_BY } from "../../core/entities/enums/OrderBy";
import { COURSE } from "../../core/entities/enums/Course";
import { TAG } from "../../core/entities/enums/Tag";
import { StatusCodes } from "http-status-codes";
import { TopicEntity } from "../../core/entities";
import { IPageable, TopicResponse } from "./dto/topics.response";
import verifyToken from "../../core/middleware/auth";

@Controller("api/topic")
export class TopicController extends BaseController {
  constructor(
    private topicRepository: TopicRepository,
    private userRepository: UserRepository
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
    const orderBy: number = parseInt((req.query.orderBy as string) || "2");
    const page: number = parseInt((req.query.page as string) || "1");

    const topics: TopicEntity[] = await this.topicRepository.findAll(
      courses,
      tags,
      search,
      orderBy,
      page
    );

    const qtdTopics: number = await this.topicRepository.count();

    const topicsResponse: TopicResponse[] = TopicResponse.from(topics);
    const response: IPageable<TopicResponse> = {
      pagination: { page: page, total: Math.ceil(qtdTopics / 10) },
      result: topicsResponse,
    };

    res.status(StatusCodes.OK).json(response);
  }

  @Post("")
  @Middleware(verifyToken)
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.topicRepository.queryRunner.connect();
      await this.topicRepository.queryRunner.startTransaction();

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
      await this.topicRepository.queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED).send({ id: createdTopic.id });
    } catch (error: any) {
      console.error(error);
      await this.topicRepository.queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await this.topicRepository.queryRunner.release();
    }
  }
}
