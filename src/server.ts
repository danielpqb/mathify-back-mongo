import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { userRouter } from "./routers/user-router";
import { handleApplicationErrors } from "./middlewares/error-handler-middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use(handleApplicationErrors);

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
