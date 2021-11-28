import {BAD_REQUEST, HttpCodes} from "./constants";

export class HTTPError extends Error {
  public errorCode: HttpCodes;
  constructor(code: HttpCodes, msg?: string) {
    super(msg || "An Unknown error have occured");
    this.errorCode = code;
    this.name = BAD_REQUEST;
  }
}
