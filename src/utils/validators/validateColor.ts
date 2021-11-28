import validateColor from "validate-color";
import {BadRequestError} from "../badRequestError";

export function validateSupportedColor(name = "color", color?: string): void {
  if (color && !validateColor(color)) {
    throw new BadRequestError(`Invalid ${name}, please use supported CSS colors`);
  }
}
