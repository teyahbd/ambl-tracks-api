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

    it("returns validation details when track object is invalid", async () => {
      const app = createApp();
      const track = generateTrack({ id: "" });

      const response = await request(app).post("/tracks").send(track);

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("validation_error");
      expect(response.body.error.details).toEqual(
        expect.arrayContaining([expect.objectContaining({ path: "id" })]),
      );
    });

    it("returns a 400 Bad Request when JSON object is malformed", async () => {
      const app = createApp();

      const response = await request(app)
        .post("/tracks")
        .set("Content-Type", "application/json")
        .send('{"type":');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: {
          code: "invalid_json",
          message: "Request body contains invalid JSON",
        },
      });
    });

    it("rejects duplicate ids and does not overwrite the existing track", async () => {
      const app = createApp();
      const initialTrack = generateTrack();
      const duplicatedTrack = generateTrack({
        titles: {
          ...initialTrack.titles,
          primary: "Cover Artist",
        },
      });

      const initialCreateResponse = await request(app)
        .post("/tracks")
        .send(initialTrack);

      expect(initialCreateResponse.status).toBe(201);

      const duplicatedCreateResponse = await request(app)
        .post("/tracks")
        .send(duplicatedTrack);

      expect(duplicatedCreateResponse.status).toBe(409);
      expect(duplicatedCreateResponse.body.error.code).toBe("conflict");

      const fetchResponse = await request(app).get(
        `/tracks/${initialTrack.id}`,
      );

      expect(fetchResponse.status).toBe(200);
      expect(fetchResponse.body).toEqual(initialTrack);
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
