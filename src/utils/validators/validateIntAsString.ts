import {BadRequestError} from "../badRequestError";

export function validateIntAsString(name = "int", int: string): void {
  const regex = /[^0-9]/g;
  const matches = int.match(regex);
  if (matches) {
    throw new BadRequestError(`Invalid ${name}, ${name} must be an int!`);
  }
}
