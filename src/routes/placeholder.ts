import {Router} from "express";
import {createSVGString} from "../lib/svgString";
import {colorValidatorMiddleware} from "../middlewares/colorValidator";
import {dimensionValidatorMiddleware} from "../middlewares/dimensionsValidator";
import {HttpCodes} from "../utils/constants";

const placeholderRouter = Router();

placeholderRouter.get("/", dimensionValidatorMiddleware, colorValidatorMiddleware, (req, res) => {
  const {width, height, bgColor, textColor, text} = req.query as Record<string, string>;

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
