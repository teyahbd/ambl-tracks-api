import request from "supertest";
import { it, expect } from "vitest";

import { createApp } from "./app.js";

it("returns a 404 for an undefined route", async () => {
  const response = await request(createApp()).get("/undefined-route");

  expect(response.status).toBe(404);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(response.body).toEqual({
    error: {
      code: "not_found",
      message: "Route not found",
    },
  });
});
