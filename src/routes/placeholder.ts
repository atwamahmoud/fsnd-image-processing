import {Router} from "express";
import {createSVGString} from "../lib/svgString";
import {dimensionValidatorMiddleware} from "../middlewares/dimensionsValidator";
import {HttpCodes} from "../utils/constants";
import {validateSupportedColor} from "../utils/validators";

const placeholderRouter = Router();

placeholderRouter.use(dimensionValidatorMiddleware).get("/", (req, res) => {
  const {width, height, bgColor, textColor, text} = req.query as Record<string, string>;
  validateSupportedColor(textColor, "textColor");
  validateSupportedColor(bgColor, "bgColor");

  res.header("Content-Type", "image/svg+xml");
  res.status(HttpCodes.ok).end(
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
