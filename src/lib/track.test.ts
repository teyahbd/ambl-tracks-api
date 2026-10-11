import { describe, it, expect } from "vitest";

import { generateTrack } from "../test/fixtures/generateTrack.js";
import { trackSchema } from "./track.js";

describe("Track Schema", () => {
  it("accepts the provided example track", () => {
    const track = generateTrack();

    const result = trackSchema.parse(track);

    expect(result).toEqual(track);
  });

  it("rejects an invalid availability timestamp", () => {
    const invalidTrack = generateTrack({
      availability: {
        from: "notADate",
        to: "2019-03-15T11:00:00Z",
        label: "Available for 29 days",
      },
    });

    const result = trackSchema.safeParse(invalidTrack);

    expect(result.success).toBe(false);
  });

  it("rejects an empty track ID", () => {
    const track = generateTrack({ id: "" });

    const result = trackSchema.safeParse(track);

    expect(result.success).toBe(false);
  });
});
