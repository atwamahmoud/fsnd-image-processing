import {BadRequestError} from "../badRequestError";

export function validateIntAsString(int: string, name = "int"): void {
  const regex = /[^0-9]/g;
  const matches = int.match(regex);
  if (matches || int.length === 0) {
    throw new BadRequestError(`Invalid ${name}, ${name} must be an int!`);
  }
}
