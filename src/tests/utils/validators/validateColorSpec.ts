import {BAD_REQUEST} from "../../../utils/constants";
import {validateSupportedColor} from "../../../utils/validators";

describe("Color formatting validation correct error", () => {
  it("Throws a BadRequestError when color is invalid", () => {
    expect(() => validateSupportedColor("")).toThrowMatching((error) => error.name === BAD_REQUEST);
    expect(() => validateSupportedColor("rgb")).toThrowMatching((error) => error.name === BAD_REQUEST);
    expect(() => validateSupportedColor("hsl(0, 100, 50)")).toThrowMatching((error) => error.name === BAD_REQUEST);
  });

  it("Doesn't Throw an error when color is valid", () => {
    expect(() => validateSupportedColor("#000000")).not.toThrow();
  });
});

describe("Color validator Supports different color formats of rgb, rgba, hex, hsl & common color names", () => {
  it("Supports 6 letter hex colors", () => {
    expect(() => validateSupportedColor("#000000")).not.toThrow();
  });
  it("Supports 3 letter hex colors", () => {
    expect(() => validateSupportedColor("#000")).not.toThrow();
  });
  it("Supports rgb colors", () => {
    expect(() => validateSupportedColor("rgb(244, 233, 150)")).not.toThrow();
  });
  it("Supports rgba colors", () => {
    expect(() => validateSupportedColor("rgba(244, 233, 150, 0.5)")).not.toThrow();
  });
  it("Supports hsl colors", () => {
    expect(() => validateSupportedColor("hsl(0, 100%, 30%)")).not.toThrow();
  });
  it("Supports common colors", () => {
    expect(() => validateSupportedColor("black")).not.toThrow();
    expect(() => validateSupportedColor("white")).not.toThrow();
    expect(() => validateSupportedColor("cornflowerblue")).not.toThrow();
  });
});
