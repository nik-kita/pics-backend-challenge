import express, { ErrorRequestHandler } from "express";
import { destinationsFiltering } from "./core/destination-filtering";
import { loadDefaults } from "./load-defaults";
import { validateAndTransformEvent } from "./middleware/validate-and-transform-event";
import { Event } from "./types";

async function main() {
  const { analyzer, available_destinations } = await loadDefaults();

  express()
    .use(express.json())
    .post("/", validateAndTransformEvent(analyzer), (req, res) => {
      const { payload, possibleDestinations, strategy } = req.body as Required<
        Event<true>
      >;

      // TODO move filtering unknown destinations into separate function
      const result = destinationsFiltering({
        available: available_destinations,
        from_client: possibleDestinations,
      });

      return res.json(result);
    })
    .all("*", (_req, _res, next) => {
      return next(new Error("Not found"));
    })
    .use(
      ((error, _req, res, _next) => {
        console.warn(error);
        return res.status(400).json({
          error: error.message ?? error,
        });
      }) as ErrorRequestHandler,
    )
    .listen(3000, () => {
      console.info("http://localhost:3000");
    });
}

main();
