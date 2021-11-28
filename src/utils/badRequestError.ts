import {BAD_REQUEST, DEFAULT_BAD_REQUEST_ERROR_MSG, HttpCodes} from "./constants";
import {HTTPError} from "./HTTPError";

export class BadRequestError extends HTTPError {
  constructor(msg?: string) {
    super(HttpCodes.badRequest, msg || DEFAULT_BAD_REQUEST_ERROR_MSG);
    this.name = BAD_REQUEST;
  }
}
