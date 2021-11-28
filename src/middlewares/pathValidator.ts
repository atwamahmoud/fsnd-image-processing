import {Request, Response, NextFunction} from "express";
import {validateString} from "../utils/validators";
import {errorWrapper} from "./errorHandler";

export function pathValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  errorWrapper(req, res, next, () => {
    const {filename, url} = req.query as Record<string, string>;
    validateString(filename || url, "filename or url");
  });
}
