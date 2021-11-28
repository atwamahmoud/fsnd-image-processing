import {BadRequestError} from "../badRequestError";

export function validateString(str: string, name: string): void {
  if (typeof str !== "string" || !str || !str.trim()) {
    throw new BadRequestError(`Invalid ${name}, please check the docs!`);
  }
}
