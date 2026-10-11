import express from 'express';
import type { Express } from 'express';

export function createApp() {
  const app: Express = express();

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: 'not_found',
        message: 'Route not found',
      },
    });
  });

  return app;
}
