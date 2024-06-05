import { Controller, Delete, Get, Middleware, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../core/bases/base.controller";

import { StatusCodes } from "http-status-codes";
import { CommentaryEntity, LikeCommentaryEntity } from "../../core/entities";
import { IPageable } from "../topic-module/dto/topics.response";
import { CommentaryResponse } from "./dto/commentary.response";
import { CommentaryRepository } from "./commentary.repository";
import { TopicRepository } from "../topic-module/topic.repository";
import { UserRepository } from "../auth-module/user.repository";
import verifyToken from "../../core/middleware/auth";
import { QueryRunner } from "typeorm";
import datasource from "../../data-source";
import NotFoundError from "../../core/errors/not-found.error";
import { LikeCommentaryRepository } from "./like-commentary.repository";

@Controller("api/topic")
export class CommentaryController extends BaseController {
  private topicRepository!: TopicRepository;
  private userRepository!: UserRepository;
  private commentaryRepository!: CommentaryRepository;
  private likeCommentaryRepository!: LikeCommentaryRepository;

  constructor() {
    super();
    this.topicRepository = new TopicRepository();
    this.userRepository = new UserRepository();
    this.commentaryRepository = new CommentaryRepository();
    this.likeCommentaryRepository = new LikeCommentaryRepository();
  }

  @Get(":id/commentary")
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    const orderBy: number = parseInt((req.query.orderBy as string) || "2");
    const page: number = parseInt((req.query.page as string) || "1");
    const id: number = parseInt(req.params.id);

    const commentaries: [CommentaryEntity[], number] =
      await this.commentaryRepository.findAll(id, orderBy, page);


    const commentariesResponse: CommentaryResponse[] = await CommentaryResponse.from(
      commentaries[0]
    );
    const response: IPageable<CommentaryResponse> = {
      pagination: { page: page, total: Math.ceil(commentaries[1] || 1 / 10) },
      result: commentariesResponse,
    };

    res.status(StatusCodes.OK).json(response);
  }

  @Post(":id/commentary")
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

      const topic = await this.topicRepository.findOneByOrFail({
        id: parseInt(req.params.id),
      });

      const entity: CommentaryEntity = this.commentaryRepository.create({
        content: req.body.content,
        topic: topic,
        author: user,
      });

      await this.commentaryRepository.save(entity);
      queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED).send({ message: "Criado com sucesso" });
    } catch (error: any) {
      console.error(error);
      queryRunner.rollbackTransaction();
      next(error);
    } finally {
      queryRunner.release();
    }
  }

  @Delete(":idTopic/commentary/:idCommentary")
  @Middleware(verifyToken)
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const idTopic: number = parseInt(req.params.idTopic);
    const idCommentary: number = parseInt(req.params.idCommentary);
    const userId = parseInt(req.userId);

    let queryRunner: QueryRunner;
    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const effected: number = (
        await this.commentaryRepository.deleteById(
          idTopic,
          idCommentary,
          userId
        )
      ).affected;

      if (effected === 0) {
        throw new NotFoundError("Comentário não encontrado");
      }

      res.status(StatusCodes.OK).json({ message: "Excluído com sucesso" });
    } catch (error: any) {
      console.error(error);
      queryRunner.rollbackTransaction();
      next(error);
    } finally {
      queryRunner.release();
    }
  }

  @Post("commentary/:id/like")
  @Middleware(verifyToken)
  async like(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: number = parseInt(req.params.id);
    const userId = parseInt(req.userId);

    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const commentary: CommentaryEntity =
        await this.commentaryRepository.findOneByOrFail({
          id: id,
        });

      const user = await this.userRepository.findOneByOrFail({
        id: userId,
      });

      const likeExists = await this.likeCommentaryRepository.existsBy({
        commentary: { id: id },
        user: { id: userId },
      });

      if (!likeExists) {
        const entity: LikeCommentaryEntity =
          this.likeCommentaryRepository.create({
            commentary: commentary,
            user: user,
          });
        await this.likeCommentaryRepository.save(entity);
      } else {
        await this.likeCommentaryRepository.deleteBy(id, userId);
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
