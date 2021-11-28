import {Request, Response, NextFunction} from "express";
import {validateIntAsString} from "../utils/validators";
import {errorWrapper} from "./errorHandler";

export function dimensionValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  errorWrapper(req, res, next, () => {
    const {width, height} = req.query as Record<string, string>;
    validateIntAsString(width, "width");
    validateIntAsString(height, "height");
  });
}
