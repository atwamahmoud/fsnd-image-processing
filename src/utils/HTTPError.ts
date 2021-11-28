import {HttpCodes, HTTP_ERROR_NAME} from "./constants";

export class HTTPError extends Error {
  public errorCode: HttpCodes;
  constructor(code: HttpCodes, msg?: string) {
    super(msg || "An Unknown error have occured");
    this.errorCode = code;
    this.name = HTTP_ERROR_NAME;
  }
}
