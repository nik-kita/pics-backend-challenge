import express, { ErrorRequestHandler } from "express";

export default express()
  .use(express.json())
  .post("/", (req, res) => {
    return res.json({ hello: "world" });
  })
  .all("*", (_req, _res, next) => {
    return next(new Error("Not found"));
  })
  .use(
    ((err, _req, res, _next) => {
      return res.status(400).json({
        error: String(err),
      });
    }) as ErrorRequestHandler,
  );
