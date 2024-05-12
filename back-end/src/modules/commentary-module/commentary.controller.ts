// import {
//   ClassMiddleware,
//   Controller,
//   Get,
//   Middleware,
//   Post,
// } from "@overnightjs/core";
// import { BaseController } from "../../core/bases/base.controller";
// import { NextFunction, Request, Response } from "express";
// import { TopicRepository, UserRepository } from "../../core/repositories";
// import { getArrayNumberFromQueryParam } from "../../core/utils";
// import { ORDER_BY } from "../../core/entities/enums/OrderBy";
// import { COURSE } from "../../core/entities/enums/Course";
// import { TAG } from "../../core/entities/enums/Tag";
// import { StatusCodes } from "http-status-codes";
// import { TopicEntity } from "../../core/entities";
// import { IPageable, TopicResponse } from "./dto/topics.response";
// import verifyToken from "../../core/middleware/auth";

// @Controller("api/topic")
// export class TopicController extends BaseController {
//   constructor(
//     private topicRepository: TopicRepository,
//     private userRepository: UserRepository
//   ) {
//     super();
//   }

//   @Get("")
//   async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
//     const courses: number[] = getArrayNumberFromQueryParam(
//       req.query.courses as string
//     );

//     const tags: number[] = getArrayNumberFromQueryParam(
//       req.query.tags as string
//     );
//     const search: string = req.query.search as string;
//     const orderBy: number = parseInt((req.query.orderBy as string) || "2");
//     const page: number = parseInt((req.query.page as string) || "0");

//     const topics: TopicEntity[] = await this.topicRepository.findAll(
//       courses,
//       tags,
//       search,
//       orderBy,
//       page
//     );

//     const qtdTopics: number = await this.topicRepository.count();

//     const topicsResponse: TopicResponse[] = TopicResponse.from(topics);
//     const response: IPageable<TopicResponse> = {
//       pagination: { page: page, total: Math.ceil(qtdTopics / 10) },
//       result: topicsResponse,
//     };

//     res.status(StatusCodes.OK).json(response);
//   }
// }
