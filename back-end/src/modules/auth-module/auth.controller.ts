import { Controller, Post } from "@overnightjs/core";
import { UserRepository } from "../../core/repositories";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../core/bases/base.controller";
import { UserEntity } from "../../core/entities";
import AuthService, { JwtToken } from "../../core/services/auth.service";
import AuthResponse from "./dto/auth.response";
import BusinessError from "../../core/errors/business.erros";
import { error } from "console";
import { UnauthorizedError } from "../../core/errors/unauthorized.error";
import { StatusCodes } from "http-status-codes";
import TokenResponse from "./dto/token.response";

@Controller("api/auth")
export class AuthController extends BaseController {
  constructor(private userRepository: UserRepository) {
    super();
  }

  @Post("signup")
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.userRepository.queryRunner.connect();
      await this.userRepository.queryRunner.startTransaction();

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
      await this.userRepository.queryRunner.commitTransaction();

      res.status(StatusCodes.CREATED).send(response);
    } catch (err: any) {
      await this.userRepository.queryRunner.rollbackTransaction();
      next(err);
    } finally {
      await this.userRepository.queryRunner.release();
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
}
