import express, { ErrorRequestHandler } from "express";
import { loadDefaults } from "./load-defaults";
import { validateAndTransformEvent } from "./middleware/validate-and-transform-event";
import { Event } from "./types";

const { analyzer, available_destinations } = loadDefaults();
const availableDestinationNames = available_destinations.map(({ name }) =>
  name
);

export default express()
  .use(express.json())
  .post("/", validateAndTransformEvent(analyzer), (req, res) => {
    const { payload, possibleDestinations, strategy } = req.body as Required<
      Event<true>
    >;

    // TODO ===
    const result = strategy(possibleDestinations.map((d) => {
      for (const k of Object.keys(d)) {
        if (!availableDestinationNames.includes(k)) d[k] = false;
      }

      return d;
    }));
    // ========

    return res.json(result);
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
