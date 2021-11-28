import {BAD_REQUEST, DEFAULT_BAD_REQUEST_ERROR_MSG} from "./constants";

export class BadRequestError extends Error {
  constructor(msg?: string) {
    super(msg || DEFAULT_BAD_REQUEST_ERROR_MSG);
    this.name = BAD_REQUEST;
  }
}
