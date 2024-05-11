import BaseError from "./base.error";

export default class NotFoundError extends BaseError {
  constructor(resource) {
    super(404, `notFound.${resource}`, "Não encontrado");
  }
}
