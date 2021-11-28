import validateColor from "validate-color";
import {BadRequestError} from "../badRequestError";

export function validateSupportedColor(color?: string, name = "color"): void {
  if (color !== undefined && !validateColor(color)) {
    throw new BadRequestError(`Invalid ${name}, please use supported CSS colors`);
  }
}
