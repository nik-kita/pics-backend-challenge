import { Handler } from "express";

export const notFoundHandler: Handler = (_req, _res, next) => {
  return next(new Error("Not found"));
};
