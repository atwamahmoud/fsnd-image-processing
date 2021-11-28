import {Router} from "express";
import {readFile, writeFile} from "fs/promises";
import {fetchFileFromFS, fetchFileFromHTTP} from "../lib/fileFetchers";
import {imageToJpeg, imageToPng, imageToWebP, resizeImage} from "../lib/imageResizer";
import {dimensionValidatorMiddleware} from "../middlewares/dimensionsValidator";
import {pathValidatorMiddleware} from "../middlewares/pathValidator";
import {getCacheFilename} from "../utils/cache";
import {CACHE_DIR, HttpCodes, IMG_DIR} from "../utils/constants";
import {getFilePath} from "../utils/getFilePath";
import {validateFileCanBeAccessed} from "../utils/validators";

const resizeRouter = Router();

resizeRouter.get("/", dimensionValidatorMiddleware, pathValidatorMiddleware, async (req, res) => {
  const {width, height, filename, url, type} = req.query as Record<string, string>;
  const intWidth = parseInt(width);
  const intHeight = parseInt(height);
  //Cache check...
  const cacheFilename = getCacheFilename(intWidth, intHeight, filename || url);
  const cacheFilePath = getFilePath(cacheFilename, CACHE_DIR);
  const cacheFileCanBeAccessed = await validateFileCanBeAccessed(cacheFilePath);
  if (cacheFileCanBeAccessed) {
    const buffer = await readFile(cacheFilePath);
    return res.status(HttpCodes.ok).end(buffer);
  }

  const filepath = getFilePath(filename || "", IMG_DIR);
  const fileCanBeAccessed = await validateFileCanBeAccessed(filepath);
  if (filename && !fileCanBeAccessed) {
    return res.status(HttpCodes.notFound).end("Couldn't find such image!");
  }

  const fileBuffer = await (filename ? fetchFileFromFS(filepath) : fetchFileFromHTTP(url));
  try {
    const bufferToSend = await resizeImage(intWidth, intHeight, fileBuffer).then((buffer) => {
      if (type === "webp") return imageToWebP(buffer);
      else if (type === "png") return imageToPng(buffer);
      else return imageToJpeg(buffer);
    });
    res.header("Content-Type", `image/${type || "jpeg"}`);
    res.header("Cache-Control", "public, max-age=31536000");
    res.status(HttpCodes.ok).end(bufferToSend);
    //Save to cache...
    await writeFile(cacheFilePath, bufferToSend);
  } catch (error: unknown) {
    const castedError = error as Error;
    res.status(HttpCodes.serverError).end(castedError.message);
    return;
  }
});

export default resizeRouter;
