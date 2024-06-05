import { NextFunction } from "express";
import createHttpError from "http-errors";
import statusCodes from "http-status-codes";

export abstract class BaseController {
  throwBusinessError(next: NextFunction, message: string) {
    next(createHttpError(statusCodes.INTERNAL_SERVER_ERROR, message));
  }
}
