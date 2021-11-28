import dotenv from "dotenv";
import express from "express";
import placeholderRouter from "./routes/placeholder";
dotenv.config();

const app = express();

app.use("/placeholder", placeholderRouter);

app.listen(process.env.PORT);
