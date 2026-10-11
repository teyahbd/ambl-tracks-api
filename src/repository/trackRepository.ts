import { createConflictError } from "../errors.js";
import type { Track } from "../lib/track.js";
import type { TrackRepository } from "./types.js";

export function createTrackRepository(): TrackRepository {
  const tracks = new Map<string, Track>();

  return {
    async insert(track) {
      if (tracks.has(track.id)) {
        throw createConflictError(`Track '${track.id}' already exists`);
      }
      tracks.set(track.id, track);
    },

    async findById(id) {
      return tracks.get(id);
    },
  };
}
