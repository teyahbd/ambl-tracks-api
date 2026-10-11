import type { Track } from "../lib/track.js";

export interface TrackRepository {
  insert(track: Track): Promise<void>;
}
