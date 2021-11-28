import {Request, Response, NextFunction} from "express";
import {HttpCodes} from "../utils/constants";
import {HTTPError} from "../utils/HTTPError";

export function errorHandlerMiddleware(req: Request, res: Response, next: NextFunction): void {
  try {
    next();
  } catch (error: unknown) {
    const castedError = error as HTTPError;
    res
      .status(castedError.errorCode || HttpCodes.serverError)
      .end(castedError.message || "An unknown error have occured!");
    return;
  }
}
