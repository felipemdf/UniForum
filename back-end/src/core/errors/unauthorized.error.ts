import { StatusCodes } from "http-status-codes";
import BaseError from "./base.error";

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
