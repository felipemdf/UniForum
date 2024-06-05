import BaseError from "./base.error";

export default class InternalServerError extends BaseError {
  constructor(err) {
    super(500, err.message, err.stack);

    console.log({
      message: err.message,
      stackTrace: err.stack,
      level: "fatal",
    });
  }
}
