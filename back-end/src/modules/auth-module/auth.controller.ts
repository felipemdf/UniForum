import {
  Controller,
  Delete,
  Get,
  Middleware,
  Patch,
  Post,
} from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../core/bases/base.controller";
import { UserEntity } from "../../core/entities";
import AuthService, { JwtToken } from "../../core/services/auth.service";
import AuthResponse from "./dto/auth.response";
import BusinessError from "../../core/errors/business.erros";
import { UnauthorizedError } from "../../core/errors/unauthorized.error";
import { StatusCodes } from "http-status-codes";
import TokenResponse from "./dto/token.response";
import datasource from "../../data-source";
import { QueryRunner, UpdateResult } from "typeorm";
import { UserRepository } from "./user.repository";
import UserResponse from "./dto/user.response";
import verifyToken from "../../core/middleware/auth";
import ProfileResponse from "./dto/profile.response";

@Controller("api/auth")
export class AuthController extends BaseController {
  userRepository!: UserRepository;

  constructor() {
    super();
    this.userRepository = new UserRepository();
  }

  @Post("signup")
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const userExists: boolean =
        await this.userRepository.existsByEmailOrUsername(req.body);

      if (userExists) {
        throw new BusinessError("Email ou username já estão sendo usados");
      }

      const entity: UserEntity = this.userRepository.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      const createdUser = await this.userRepository.save(entity);
      const token = AuthService.generateToken(createdUser.id.toString());
      const refreshToken = AuthService.generateRefreshToken(
        createdUser.id.toString()
      );

      const response = AuthResponse.from(createdUser, token, refreshToken);
      await queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED).send(response);
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      next(err);
    } finally {
      await queryRunner.release();
    }
  }

  @Post("signin")
  async siginIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const user: UserEntity = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new UnauthorizedError(
          "Credenciais inválidas. Verifique seu emails e senha"
        );
      }

      if (!(await AuthService.comparePasswords(password, user.password))) {
        throw new UnauthorizedError(
          "Credenciais inválidas. Verifique seu emails e senha"
        );
      }

      console.log(user.photo);

      const token = AuthService.generateToken(user.id.toString());
      const refreshToken = AuthService.generateRefreshToken(user.id.toString());

      const response = AuthResponse.from(user, token, refreshToken);

      res.status(StatusCodes.OK).send(response);
    } catch (err: any) {
      next(err);
    }
  }

  @Post("token/refresh")
  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { refreshToken } = req.body;

    let decodeRefreshToken!: JwtToken;
    try {
      decodeRefreshToken = AuthService.decodeRefreshToken(refreshToken);
    } catch (err: any) {
      next(new UnauthorizedError("Não autorizado"));
      return;
    }

    const token = AuthService.generateToken(decodeRefreshToken.sub);
    res.status(StatusCodes.OK).send(new TokenResponse(token));
  }

  @Patch("user")
  @Middleware(verifyToken)
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.userId);
    const email: string = req.body.email;
    const password: string = req.body.password;

    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user: UserEntity = await this.userRepository.findOneBy({
        id: userId,
      });

      if (!user) {
        throw new UnauthorizedError(
          "Credenciais inválidas. Verifique seu emails e senha"
        );
      }

      user.email = email && email.trim().length > 0 ? email : user.email;
      user.password =
        password && password.trim().length > 0 ? password : user.password;

      const updatedUser = await this.userRepository.save(user);
      const response = UserResponse.from(updatedUser);

      queryRunner.commitTransaction();
      res.status(StatusCodes.OK).send(response);
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      next(err);
    } finally {
      await queryRunner.release();
    }
  }

  @Patch("user/profile")
  @Middleware(verifyToken)
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.userId);
    const username: string = req.body.username;
    const course: string = req.body.course;
    const period: string = req.body.period;
    const photo: string = req.body.photo;

    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const user: UserEntity = await this.userRepository.findOneBy({
        id: userId,
      });

      if (!user) {
        throw new UnauthorizedError(
          "Credenciais inválidas. Verifique seu emails e senha"
        );
      }

      user.username =
        username && username.trim().length > 0 ? username : user.username;
      user.course = course ? parseInt(course) : user.course;
      user.period = period ? parseInt(period) : user.period;
      user.photo = photo ? photo : user.photo;

      const updatedUser = await this.userRepository.save(user);
      // const response = UserResponse.from(updatedUser);

      queryRunner.commitTransaction();
      res.status(StatusCodes.OK).send(updatedUser);
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      next(err);
    } finally {
      await queryRunner.release();
    }
  }

  @Delete("user")
  @Middleware(verifyToken)
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.userId);
    console.log(userId);
    let queryRunner: QueryRunner;

    try {
      queryRunner = datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const updated: UpdateResult = await this.userRepository.softDelete({
        id: userId,
      });

      if (updated.affected === 0) {
        throw new UnauthorizedError(
          "Credenciais inválidas. Verifique seu emails e senha"
        );
      }

      queryRunner.commitTransaction();
      res
        .status(StatusCodes.OK)
        .send({ message: "Usuário deletado com sucesso" });
    } catch (err: any) {
      await queryRunner.rollbackTransaction();
      next(err);
    } finally {
      await queryRunner.release();
    }
  }

  @Get("profile/:id")
  async profile(req: Request, res: Response, next: NextFunction) {
    const id: number = parseInt(req.params.id);

    const user: UserEntity = await this.userRepository.profile(id);

    const response: ProfileResponse = await ProfileResponse.from(user);
    res.status(StatusCodes.OK).send(response);
  }
}
