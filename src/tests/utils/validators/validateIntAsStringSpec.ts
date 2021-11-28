import {BAD_REQUEST} from "../../../utils/constants";
import {validateIntAsString} from "../../../utils/validators";

describe("Int validator throws correct errors @ expected inputs", () => {
  it("Throws a BadRequestError when int is empty", () => {
    expect(() => validateIntAsString("")).toThrowMatching((error) => error.name === BAD_REQUEST);
  });
  it("Throws a BadRequestError when string float is passed", () => {
    expect(() => validateIntAsString("123.33")).toThrowMatching((error) => error.name === BAD_REQUEST);
  });
  it("Throws a BadRequestError when int contains a space", () => {
    expect(() => validateIntAsString("123 ")).toThrowMatching((error) => error.name === BAD_REQUEST);
    expect(() => validateIntAsString(" 123")).toThrowMatching((error) => error.name === BAD_REQUEST);
    expect(() => validateIntAsString(" 123 ")).toThrowMatching((error) => error.name === BAD_REQUEST);
  });

  it("Doesn't Throw an error when color is valid", () => {
    expect(() => validateIntAsString("123")).not.toThrow();
  });
});
