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

import { StatusCodes } from "http-status-codes";
import { CommentaryEntity, TopicEntity } from "../../core/entities";
import { IPageable, TopicResponse } from "../topic-module/dto/topics.response";
import verifyToken from "../../core/middleware/auth";
import { CommentaryRepository } from "../../core/repositories/commentary.repository";
import { TopicDetailsResponse } from "../topic-module/dto/topic-details.response";
import { CommentaryResponse } from "./dto/commentary.response";

@Controller("api/topic")
export class CommentaryController extends BaseController {
  constructor(
    private topicRepository: TopicRepository,
    private commentaryRepository: CommentaryRepository,
    private userRepository: UserRepository
  ) {
    super();
  }

  @Get(":id/commentary")
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const orderBy: number = parseInt((req.query.orderBy as string) || "2");
    const page: number = parseInt((req.query.page as string) || "1");
    const id: number = parseInt(req.params.id);

    const commentaries: CommentaryEntity[] = await this.commentaryRepository.findAll(
      id,
      orderBy,
      page
    );

    const qtdCommentaries: number = await this.commentaryRepository.count({where: {topic: {id: id}}});

    const commentariesResponse: CommentaryResponse[] = CommentaryResponse.from(commentaries);
    const response: IPageable<CommentaryResponse> = {
      pagination: { page: page, total: Math.ceil(qtdCommentaries / 10) },
      result: commentariesResponse,
    };

    res.status(StatusCodes.OK).json(response);
  }

  @Post(":id/commentary")
  // @Middleware(verifyToken)
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.commentaryRepository.queryRunner.connect();
      await this.commentaryRepository.queryRunner.startTransaction();

      const user = await this.userRepository.findOneByOrFail({
        id: req.body.userId,
      });

      const topic = await this.topicRepository.findOneByOrFail({
        id: parseInt(req.params.id),
      });

      const entity: CommentaryEntity = this.commentaryRepository.create({
        content: req.body.content,
        topic: topic,
        author: user,
      });

      await this.commentaryRepository.save(entity);
      await this.topicRepository.save({
        id: topic.id,
        qtdComments: topic.qtdComments + 1,
      });

      await this.commentaryRepository.queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED);
      res.send(req.query);
    } catch (error: any) {
      console.error(error);
      await this.commentaryRepository.queryRunner.rollbackTransaction();
      next(error);
    } finally {
      await this.commentaryRepository.queryRunner.release();
    }
  }
}
