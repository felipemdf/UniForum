import BaseError from "./base.error";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export default class BusinessError extends BaseError {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}
