import {BAD_REQUEST, HttpCodes} from "../../../utils/constants";
import {HTTPError} from "../../../utils/HTTPError";
import {validateString} from "../../../utils/validators";

const badRequestErrorMatcher = (error: HTTPError) =>
  error.errorCode === HttpCodes.badRequest && error.name === BAD_REQUEST;

describe("String validation", () => {
  it("Throws correct error when empty string is passed", () => {
    expect(() => validateString("")).toThrowMatching(badRequestErrorMatcher);
  });
  it("Throws correct error when string containing only spaces is passed", () => {
    expect(() => validateString(" ")).toThrowMatching(badRequestErrorMatcher);
  });
  it("Doesn't throw when valid string is passed", () => {
    expect(() => validateString("a")).not.toThrowMatching(badRequestErrorMatcher);
    expect(() => validateString("string")).not.toThrowMatching(badRequestErrorMatcher);
    expect(() => validateString("hola ")).not.toThrowMatching(badRequestErrorMatcher);
    expect(() => validateString(" hola")).not.toThrowMatching(badRequestErrorMatcher);
    expect(() => validateString(" hola ")).not.toThrowMatching(badRequestErrorMatcher);
  });
});
