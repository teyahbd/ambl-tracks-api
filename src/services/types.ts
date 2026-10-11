import type { Track } from "../lib/track.js";

export interface TrackService {
  create(track: Track): Promise<Track>;
  getById(id: string): Promise<Track>;
}
