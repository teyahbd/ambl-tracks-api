import { describe, it, expect } from "vitest";

import { generateTrack } from "../test/fixtures/generateTrack.js";
import { trackSchema } from "./track.js";

describe("Track", () => {
  it("accepts the provided example track", () => {
    const track = generateTrack();

    const result = trackSchema.parse(track);

    expect(result).toEqual(track);
  });
});
