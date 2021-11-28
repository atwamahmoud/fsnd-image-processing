import {Request, Response, NextFunction} from "express";
import {validateIntAsString} from "../utils/validators";

export function dimensionValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  const {width, height} = req.query as Record<string, string>;
  validateIntAsString(width, "width");
  validateIntAsString(height, "height");
  next();
}
