import type { ErrorRequestHandler } from "express";
import { isAppError } from "../errors.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (isAppError(error)) {
    response.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });
    return;
  }

  console.error("Unhandled request error", error);

  response.status(500).json({
    error: {
      code: "internal_error",
      message: "An unexpected error occurred",
    },
  });
};
