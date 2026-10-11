import express from "express";
import type { Express } from "express";

export function createApp() {
  const app: Express = express();

  return app;
}
