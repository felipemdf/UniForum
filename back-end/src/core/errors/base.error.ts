import { getReasonPhrase } from "http-status-codes";

export default class BaseError extends Error {
  statusCode: any;
  errorCode: any;

  constructor(statusCode, message, stack?) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = getReasonPhrase(statusCode);
    this.stack = stack;
  }

  getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      stack: this.stack,
    };
  }
}
