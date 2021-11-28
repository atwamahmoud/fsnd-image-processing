import {Router} from "express";
import validateColor from "validate-color";
import {createSVGString} from "../lib/svgString";
import {BAD_REQUEST, HTTP_CODES} from "../utils/constants";
import {validateIntAsString} from "../utils/validators";

const placeholderRouter = Router();

placeholderRouter.use("/", (req, res, next) => {
  const {width, height, bgColor, textColor} = req.query as Record<string, string>;
  try {
    validateColor(textColor);
    validateColor(bgColor);
    validateIntAsString("width", width);
    validateIntAsString("height", height);
  } catch (error: unknown) {
    const castedError = error as Error;
    if (castedError.name === BAD_REQUEST) {
      res.status(HTTP_CODES.badRequest).end(castedError.message);
    }
    res.status(HTTP_CODES.serverError).end(castedError.message);
  }

  next();
});

placeholderRouter.get("/", (req, res) => {
  const {width, height, bgColor, textColor, text} = req.query as Record<string, string>;
  res.header("Content-Type", "image/svg+xml");
  res.send(
    createSVGString({
      width: parseInt(width),
      height: parseInt(height),
      bgColor,
      text,
      textColor,
    }),
  );
});

export default placeholderRouter;
