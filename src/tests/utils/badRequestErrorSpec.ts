import {BadRequestError} from "../../utils/badRequestError";
import {BAD_REQUEST, DEFAULT_BAD_REQUEST_ERROR_MSG} from "../../utils/constants";

describe("BadRequestError class", () => {
  it("Error message is set properly", () => {
    const msg = "Error Message";
    const error = new BadRequestError(msg);
    expect(error.message).toBe(msg);
  });
  it("Default error msg is set correctly", () => {
    const error = new BadRequestError();
    expect(error.message).toBe(DEFAULT_BAD_REQUEST_ERROR_MSG);
  });
  it("Name is set to BAD_REQUEST", () => {
    const error = new BadRequestError();
    expect(error.name).toBe(BAD_REQUEST);
  });
});
