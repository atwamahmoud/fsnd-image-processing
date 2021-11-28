import {NextFunction, Request, Response} from "express";
import {validateSupportedColor} from "../utils/validators";
import {errorWrapper} from "./errorHandler";

export function colorValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  errorWrapper(req, res, next, () => {
    const {bgColor, textColor} = req.query as Record<string, string>;
    validateSupportedColor(textColor, "textColor");
    validateSupportedColor(bgColor, "bgColor");
  });
}
