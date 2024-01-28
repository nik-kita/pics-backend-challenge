import { Event } from "../types";
import { z } from "zod";

export const EventDto = z.object(
  {
    possibleDestinations: z.array(
      z.record(z.string(), z.boolean()).and(
        z.custom((v) => Object.keys(v || {}).length, {
          message: "should not be empty",
        }),
      ),
    ),
    payload: z.custom<z.ZodUnknown>((v) => v !== undefined, {
      message: "should be defined",
    }),
    strategy: z.string().optional(),
  } satisfies Record<keyof Event, unknown>,
).strict() satisfies z.ZodType<Event>;
