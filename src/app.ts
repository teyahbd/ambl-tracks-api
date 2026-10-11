import express from "express";
import type { Express } from "express";

import { createTrackRepository } from "./repository/trackRepository.js";
import { createTrackController } from "./controller/trackController.js";
import { createTrackService } from "./services/trackService.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const repository = createTrackRepository();
  const service = createTrackService(repository);
  const controller = createTrackController(service);

  const app: Express = express();

  app.use(express.json());

  app.post("/tracks", controller.create);
  app.get("/tracks/:id", controller.getById);

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: "not_found",
        message: "Route not found",
      },
    });
  });

  app.use(errorHandler);

  return app;
}
