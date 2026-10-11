import request from "supertest";
import { it, expect, describe } from "vitest";

import { createApp } from "./app.js";
import { generateTrack } from "./test/fixtures/generateTrack.js";

describe("app", () => {
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

  describe("POST /tracks", () => {
    it("creates a track when provided a valid JSON object and returns expected response", async () => {
      const app = createApp();
      const track = generateTrack();

      const response = await request(app).post("/tracks").send(track);

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.headers.location).toBe(`/tracks/${track.id}`);
      expect(response.body).toEqual(track);
    });
  });

  describe("GET /tracks", () => {
    it("retrieves a created track when passed a valid ID", async () => {
      const app = createApp();
      const track = generateTrack();

      const createdResponse = await request(app).post("/tracks").send(track);
      expect(createdResponse.status).toBe(201);

      const fetchedRespose = await request(app).get(`/tracks/${track.id}`);

      expect(fetchedRespose.status).toBe(200);
      expect(fetchedRespose.body).toEqual(track);
    });

    it("returns a 404 when the track does not exist", async () => {
      const app = createApp();

      const response = await request(app).get("/tracks/madeUpId");

      expect(response.status).toBe(404);
      expect(response.headers["content-type"]).toMatch(/application\/json/);
      expect(response.body).toEqual({
        error: {
          code: "not_found",
          message: "Track 'madeUpId' was not found",
        },
      });
    });
  });
});
