import dotenv from "dotenv";
import express from "express";
import {errorHandlerMiddleware} from "./middlewares/errorHandler";
import placeholderRouter from "./routes/placeholder";
import resizeRouter from "./routes/resize";
dotenv.config();
import {initDirs} from "./utils/initCacheDir";

initDirs();

export const app = express();

app.use("*", errorHandlerMiddleware);

app.use("/placeholder", placeholderRouter);
app.use("/resize", resizeRouter);

app.listen(process.env.PORT);
