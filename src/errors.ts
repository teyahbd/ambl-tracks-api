export interface AppError extends Error {
  readonly statusCode: number;
  readonly code: string;
}

export function createNotFoundError(message: string): AppError {
  return Object.assign(new Error(message), {
    statusCode: 404,
    code: "not_found",
  });
}

export function isAppError(error: unknown): error is AppError {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    "code" in error &&
    typeof error.code === "string"
  );
}
