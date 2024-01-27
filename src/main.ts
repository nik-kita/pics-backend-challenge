import express from "express";
import { allErrorHandler } from "./common/all-error-handler";
import { notFoundHandler } from "./common/not-found-handler";
import { destinationsFiltering } from "./core/destination-filtering";
import { loadDefaults } from "./load-defaults";
import { validateAndTransformEvent } from "./middleware/validate-and-transform-event";
import { Event } from "./types";

async function main() {
  const { analyzer, available_destinations } = await loadDefaults();

  express()
    .use(express.json())
    .post("/", validateAndTransformEvent(analyzer), (req, res) => {
      const { payload, possibleDestinations } = req.body as Required<
        Event<true>
      >;
      const result = destinationsFiltering({
        available: available_destinations,
        from_client: possibleDestinations,
      });

      return res.json(result);
    })
    .all("*", notFoundHandler)
    .use(allErrorHandler)
    .listen(3000, () => {
      console.info("http://localhost:3000");
    });
}

main();
