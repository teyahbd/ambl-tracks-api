import type { RequestHandler } from "express";

import type { TrackService } from "../services/types.js";
import { trackSchema } from "../lib/track.js";

export function createTrackController(trackService: TrackService) {
  const create: RequestHandler = async (request, response) => {
    const track = trackSchema.parse(request.body);

    const createdTrack = await trackService.create(track);

    response
      .location(`/tracks/${createdTrack.id}`)
      .status(201)
      .json(createdTrack);
  };

  const getById: RequestHandler<{ id: string }> = async (request, response) => {
    const track = await trackService.getById(request.params.id);

    response.status(200).json(track);
  };

  return { create, getById };
}
