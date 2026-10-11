import { describe, it, expect } from "vitest";

import { createTrackRepository } from "./trackRepository.js";
import { generateTrack } from "../test/fixtures/generateTrack.js";

describe("trackRepository", () => {
  it("finds a previously inserted track by a valid ID", async () => {
    const repository = createTrackRepository();
    const track = generateTrack();

    await repository.insert(track);

    const response = await repository.findById(track.id);

    expect(response).toEqual(track);
  });

  it("returns undefined when a track with given ID does not exist", async () => {
    const repository = createTrackRepository();

    const response = await repository.findById("madeUp");

    expect(response).toBeUndefined();
  });
});
