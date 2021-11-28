import {BadRequestError} from "../badRequestError";

export function validateIntAsString(int?: string, name = "int"): void {
  const regex = /[^0-9]/g;
  if (typeof int === "undefined") {
    throw new BadRequestError(`Invalid ${name}, expected an int, found undefined`);
  }
  const matches = int.match(regex);
  if (matches || int.length === 0) {
    throw new BadRequestError(`Invalid ${name}, ${name} must be an int!`);
  }
}
