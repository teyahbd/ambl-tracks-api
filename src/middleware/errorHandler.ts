import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

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

  if (
    error instanceof SyntaxError &&
    "type" in error &&
    error.type === "entity.parse.failed"
  ) {
    response.status(400).json({
      error: {
        code: "invalid_json",
        message: "Request body contains invalid JSON",
      },
    });
    return;
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: "validation_error",
        message: "Request validation failed",
        details: error.issues.map((issue) => ({
          path: issue.path.length === 0 ? "body" : issue.path.join("."),
          message: issue.message,
        })),
      },
    });
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
