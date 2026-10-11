import type { TrackRepository } from "../repository/types.js";
import type { TrackService } from "./types.js";

export function createTrackService(repository: TrackRepository): TrackService {
  return {
    async create(track) {
      await repository.insert(track);
      return track;
    },
  };
}
