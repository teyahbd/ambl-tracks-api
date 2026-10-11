import { describe, expect, it, vi } from "vitest";

import { generateTrack } from "../test/fixtures/generateTrack.js";
import { createTrackService } from "./trackService.js";
import { type TrackRepository } from "../repository/types.js";

describe("trackService", () => {
  describe(".insert", () => {
    it("inserts a track and returns it", async () => {
      const repository = {
        insert: vi.fn(async () => {}),
        findById: vi.fn(async () => undefined),
      };
      const track = generateTrack();

      const service = createTrackService(repository);

      const result = await service.create(track);

      expect(repository.insert).toHaveBeenCalledExactlyOnceWith(track);
      expect(result).toEqual(track);
    });
  });
  describe(".getById", () => {
    it("returns a track found by valid ID", async () => {
      const track = generateTrack();

      const repository = {
        insert: vi.fn<TrackRepository["insert"]>(),
        findById: vi.fn<TrackRepository["findById"]>().mockResolvedValue(track),
      };

      const service = createTrackService(repository);

      const result = await service.getById(track.id);

      expect(repository.findById).toHaveBeenCalledExactlyOnceWith(track.id);
      expect(result).toEqual(track);
    });

    it("throws a not found error when no track with the given id exists", async () => {
      const repository = {
        insert: vi.fn<TrackRepository["insert"]>(),
        findById: vi
          .fn<TrackRepository["findById"]>()
          .mockResolvedValue(undefined),
      };

      const service = createTrackService(repository);

      await expect(service.getById("doesNotExist")).rejects.toMatchObject({
        statusCode: 404,
        code: "not_found",
        message: "Track 'doesNotExist' was not found",
      });
    });
  });
});
