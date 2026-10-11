import type { Track } from "../lib/track.js";

export interface TrackService {
  create(track: Track): Promise<Track>;
}
