import dotenv from "dotenv";
import express from "express";
import placeholderRouter from "./routes/placeholder";
dotenv.config();

export const app = express();

app.use("/placeholder", placeholderRouter);

app.listen(process.env.PORT);
