import { createNotFoundError } from "../errors.js";
import type { TrackRepository } from "../repository/types.js";
import type { TrackService } from "./types.js";

export function createTrackService(repository: TrackRepository): TrackService {
  return {
    async create(track) {
      await repository.insert(track);
      return track;
    },

    async getById(id) {
      const track = await repository.findById(id);

      if (track === undefined) {
        throw createNotFoundError(`Track '${id}' was not found`);
      }

      return track;
    },
  };
}
