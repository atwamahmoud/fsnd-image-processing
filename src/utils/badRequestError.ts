import {BAD_REQUEST} from "./constants";

export class BadRequestError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = BAD_REQUEST;
  }
}
