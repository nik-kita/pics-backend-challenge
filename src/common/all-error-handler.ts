import { ErrorRequestHandler } from "express";

export const allErrorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  console.warn(error);
  return res.status(400).json({
    error: error.message ?? error,
  });
};
