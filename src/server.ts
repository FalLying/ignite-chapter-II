import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swagger from "swagger-ui-express";

import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api", swagger.serve, swagger.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response
      .status(500)
      .json({ message: `Internal Server Error - ${err.message}` });
  }
);

app.listen(3333, () => console.log("🚀 Server has started at port 3333"));
