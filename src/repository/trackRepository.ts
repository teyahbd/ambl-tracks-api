import type { Track } from "../lib/track.js";
import type { TrackRepository } from "./types.js";

export function createTrackRepository(): TrackRepository {
  const tracks = new Map<string, Track>();

  return {
    async insert(track) {
      tracks.set(track.id, track);
    },
  };
}
