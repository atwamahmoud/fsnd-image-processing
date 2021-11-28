import {Request, Response, NextFunction} from "express";
import {validateString} from "../utils/validators";

export function pathValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  const {filename, url} = req.query as Record<string, string>;
  validateString(filename || url, "filename or url");
  next();
}
