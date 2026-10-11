import { describe, expect, it, vi } from "vitest";

import { generateTrack } from "../test/fixtures/generateTrack.js";
import { createTrackService } from "./trackService.js";

describe("trackService", () => {
  it("inserts a track and returns it", async () => {
    const repository = {
      insert: vi.fn(async () => {}),
    };
    const track = generateTrack();

    const service = createTrackService(repository);

    const result = await service.create(track);

    expect(repository.insert).toHaveBeenCalledExactlyOnceWith(track);
    expect(result).toEqual(track);
  });
});
