import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import studentRouter from "./routes/students.routes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(authRouter);
  app.use(studentRouter);

  return app;
}
