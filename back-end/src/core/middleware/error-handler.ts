import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error";
import InternalServerError from "../errors/internal-server.error";

const normalizeError = (err) => {
  if (err instanceof BaseError) {
    return err;
  }

  return new InternalServerError(err);
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  const error = normalizeError(err);

  const statusCode = error.statusCode;
  const body = error.getBody();

  res.status(statusCode).send(body);
};
