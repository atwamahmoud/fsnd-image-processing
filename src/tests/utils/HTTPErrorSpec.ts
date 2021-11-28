import {HttpCodes, HTTP_ERROR_NAME} from "../../utils/constants";
import {HTTPError} from "../../utils/HTTPError";

describe("HTTPError class is behaving correctly", () => {
  it("Sets the HTTPCode correctly", () => {
    const error = new HTTPError(HttpCodes.notFound);
    expect(error.errorCode).toBe(HttpCodes.notFound);
  });

  it("Sets the msg correctly", () => {
    const msg = "My Message";
    const error = new HTTPError(HttpCodes.notFound, msg);
    expect(error.message).toBe(msg);
  });
  it("Sets the error name correctly", () => {
    const error = new HTTPError(HttpCodes.notFound);
    expect(error.name).toBe(HTTP_ERROR_NAME);
  });
});
